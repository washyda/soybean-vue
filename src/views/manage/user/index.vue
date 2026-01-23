<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { fetchGetUserList, fetchRemoveUser } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const searchParams = ref<Api.SystemManage.UserSearchParams>({
  current: 1,
  size: 12,
  status: null,
  querySearch: null,
  gender: null,
  phone: null,
  email: null
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useNaivePaginatedTable({
  api: () => fetchGetUserList(searchParams.value),
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
      title: $t('common.index'),
      align: 'center',
      width: 64,
      render: (_, index) => index + 1
    },
    {
      key: 'userName',
      title: $t('page.manage.user.userName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'gender',
      title: $t('page.manage.user.gender'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.gender === null) {
          return null;
        }

        const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
          1: 'primary',
          2: 'error'
        };

        const label = $t(userGenderRecord[row.gender]);

        return <NTag type={tagMap[row.gender]}>{label}</NTag>;
      }
    },
    {
      key: 'nickName',
      title: $t('page.manage.user.nickName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'phone',
      title: $t('page.manage.user.phone'),
      align: 'center',
      width: 120
    },
    {
      key: 'email',
      title: $t('page.manage.user.email'),
      align: 'center',
      minWidth: 200
    },
    {
      key: 'status',
      title: $t('page.manage.user.status'),
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
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
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

async function handleBatchDelete() {
  await fetchRemoveUser(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: number) {
  await fetchRemoveUser([id]);

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
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
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
