<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { enableStatusRecord } from '@/constants/business';
import { fetchGetRoleList, fetchRemoveRole } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import RoleSearch from './modules/role-search.vue';
import RoleOperateDrawer from './modules/role-operate-drawer.vue';
import MenuAuthModal from './modules/menu-auth-modal.vue';
import ButtonAuthModal from './modules/button-auth-modal.vue';

const appStore = useAppStore();

const searchParams = ref<Api.SystemManage.RoleSearchParams>({
  status: null,
  querySearch: null,
  current: 1,
  size: 12
});

enum OperationType {
  AUTHMENU,
  AUTHBUTTON
}

const { bool: menuAuthVisible, setTrue: openMenuAuthModal } = useBoolean();
const { bool: buttonAuthVisible, setTrue: openButtonAuthModal } = useBoolean();

const { data, columns, columnChecks, loading, mobilePagination, getData, getDataByPage } = useNaivePaginatedTable({
  api: () => fetchGetRoleList(searchParams.value),
  transform: response => defaultTransform(response),
  onPaginationParamsChange: params => {
    searchParams.value.current = params.page;
    searchParams.value.size = params.pageSize;
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 48,
      render: (_, index) => index + 1
    },
    {
      key: 'roleName',
      title: '角色名称',
      align: 'center',
      minWidth: 47
    },
    {
      key: 'roleCode',
      title: '角色编码',
      align: 'center',
      minWidth: 47
    },
    {
      key: 'description',
      title: '角色描述',
      align: 'center',
      minWidth: 80
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning'
        };

        const label = $t(enableStatusRecord[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 300,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NButton
            type="primary"
            ghost
            size="small"
            onClick={() => {
              openModal(row, OperationType.AUTHMENU);
            }}
          >
            {$t('page.manage.role.menuAuth')}
          </NButton>
          <NButton
            type="primary"
            ghost
            size="small"
            onClick={() => {
              openModal(row, OperationType.AUTHBUTTON);
            }}
          >
            {$t('page.manage.role.buttonAuth')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, 'id', getData);

async function handleDelete(id: number) {
  const { error } = await fetchRemoveRole([id]);
  if (error) return;
  onDeleted();
}

async function handleBatchDelete() {
  const { error } = await fetchRemoveRole(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

const roleId = ref<number>(-1);
function openModal(row: Api.SystemManage.Role, mode: OperationType) {
  roleId.value = row.id;
  if (mode === OperationType.AUTHMENU) {
    openMenuAuthModal();
  } else {
    openButtonAuthModal();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <RoleSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.role.title')" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <RoleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
    <MenuAuthModal v-model:visible="menuAuthVisible" :role-id="roleId" />
    <ButtonAuthModal v-model:visible="buttonAuthVisible" :role-id="roleId" />
  </div>
</template>
