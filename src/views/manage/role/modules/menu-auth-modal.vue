<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import type { TreeInst } from 'naive-ui';
import { fetchGetAllPages, fetchGetMenuTree, fetchGetRoleMenus, fetchUpdateRoleMenus } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'MenuAuthModal'
});

interface Props {
  /** the roleId */
  roleId: number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.menuAuth'));

const home = shallowRef('');

async function getHome() {
  home.value = 'home';
}

async function updateHome(val: string) {
  // request

  home.value = val;
}

const pageSelectOptions = shallowRef<CommonType.Option[]>([]);

async function getPages() {
  const { error, data } = await fetchGetAllPages();

  if (!error) {
    pageSelectOptions.value = data;
  }
}

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree();

  if (!error) {
    tree.value = data;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  const { error, data } = await fetchGetRoleMenus(props.roleId);
  if (!error) {
    checks.value = data;
  }
}

const treeRef = ref<TreeInst>();
async function handleSubmit() {
  // request
  const { error } = await fetchUpdateRoleMenus({
    roleId: props.roleId,
    checks: checks.value,
    indeterminate: (treeRef.value?.getIndeterminateData().keys as number[]) || []
  });

  if (!error) {
    window.$message?.success?.($t('common.modifySuccess'));

    closeModal();
  } else {
    window.$message?.error?.($t('common.error'));
  }
}

function init() {
  getHome();
  getPages();
  getTree();
  getChecks();
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <div class="flex-y-center gap-16px pb-12px">
      <div>{{ $t('page.manage.menu.home') }}</div>
      <NSelect :value="home" :options="pageSelectOptions" size="small" class="w-160px" @update:value="updateHome" />
    </div>
    <NTree
      ref="treeRef"
      v-model:checked-keys="checks"
      :data="tree"
      checkable
      cascade
      key-field="id"
      expand-on-click
      virtual-scroll
      block-line
      class="h-280px"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
