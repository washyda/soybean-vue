<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { fetchAddUser, fetchGetAllRoles, fetchGetUserInfo, fetchUpdateUser } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule, formRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.SystemManage.User, 'id' | 'userName' | 'gender' | 'nickName' | 'phone' | 'email' | 'status'> & {
  roles: number[];
};

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: -1,
    userName: '',
    gender: 1,
    nickName: '',
    phone: '',
    email: '',
    status: null,
    roles: []
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'nickName' | 'gender' | 'status' | 'phone' | 'email'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: formRules.userName[0],
  nickName: formRules.nickName[0],
  gender: defaultRequiredRule,
  phone: formRules.phone[0],
  email: formRules.email[0],
  status: defaultRequiredRule
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    roleOptions.value = data.map(item => ({
      label: item.roleName,
      value: item.id
    }));
  }
}

async function handleInitModel() {
  model.value = createDefaultModel();
  const { data, error } = await fetchGetUserInfo(props.rowData?.id);
  if (!error && props.operateType === 'edit') {
    const params = {
      ...data,
      roles: data.roles.map(item => item.id)
    };
    Object.assign(model.value, params);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    const { error } = await fetchAddUser(model.value);
    if (error) return;
  } else {
    const { error } = await fetchUpdateUser(model.value);
    if (error) return;
  }
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getRoleOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.userName')" path="userName">
          <NInput v-model:value="model.userName" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.gender')" path="gender">
          <NRadioGroup v-model:value="model.gender">
            <NRadio v-for="item in userGenderOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.nickName')" path="nickName">
          <NInput v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.phone')" path="phone">
          <NInput v-model:value="model.phone" :placeholder="$t('page.manage.user.form.phone')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.email')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.manage.user.form.email')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userRole')" path="roles">
          <NSelect
            v-model:value="model.roles"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.manage.user.form.userRole')"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
