<template>
  <el-dialog 
    title="封禁玩家" 
    v-model="dialogVisible" 
    width="500px"
    :before-close="handleClose"
  >
    <el-form :model="banForm" label-width="100px" :rules="rules" ref="banFormRef">
      <el-form-item label="玩家ID" prop="playerId">
        <el-input v-model="banForm.playerId" disabled />
      </el-form-item>
      
      <el-form-item label="玩家名称" prop="playerName">
        <el-input v-model="banForm.playerName" disabled />
      </el-form-item>
      
      <el-form-item label="封禁原因" prop="reason">
        <el-select v-model="banForm.reason" placeholder="请选择封禁原因" style="width: 100%">
          <el-option value="作弊" label="作弊" />
          <el-option value="辱骂" label="辱骂" />
          <el-option value="消极比赛" label="消极比赛" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="封禁时长" prop="duration">
        <el-radio-group v-model="banForm.duration">
          <el-radio :label="1">1天</el-radio>
          <el-radio :label="7">7天</el-radio>
          <el-radio :label="30">30天</el-radio>
          <el-radio :label="-1">永久</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="备注" prop="comment">
        <el-input 
          v-model="banForm.comment"
          type="textarea" 
          :rows="3" 
          placeholder="请输入封禁备注（可选）"
        />
      </el-form-item>
    </el-form>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading">
          确认封禁
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { BanReason } from '@/types';

const props = defineProps<{
  visible: boolean,
  playerId: string,
  playerName: string
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void,
  (e: 'ban-confirmed', data: any): void
}>();

const dialogVisible = ref(props.visible);
const loading = ref(false);
const banFormRef = ref<FormInstance>();

// 表单数据
const banForm = reactive({
  playerId: props.playerId,
  playerName: props.playerName,
  reason: '' as BanReason,
  duration: 7,
  comment: ''
});

// 表单验证规则
const rules = {
  reason: [{ required: true, message: '请选择封禁原因', trigger: 'change' }],
  duration: [{ required: true, message: '请选择封禁时长', trigger: 'change' }]
};

// 关闭对话框
const handleClose = () => {
  emit('update:visible', false);
};

// 确认封禁
const handleConfirm = async () => {
  if (!banFormRef.value) return;
  
  try {
    await banFormRef.value.validate();
    
    // 二次确认
    await ElMessageBox.confirm(
      `确定要封禁玩家 ${banForm.playerName} ${banForm.duration === -1 ? '永久' : banForm.duration + '天'}吗？`,
      '确认封禁',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    
    loading.value = true;
    
    // 模拟API调用
    setTimeout(() => {
      emit('ban-confirmed', {
        ...banForm,
        banTime: new Date()
      });
      
      ElMessage.success('玩家已成功封禁');
      handleClose();
      loading.value = false;
    }, 1000);
    
  } catch (error) {
    if (error !== 'cancel') {
      console.error('表单验证失败:', error);
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-form-item__label) {
  color: var(--text-primary);
}

:deep(.el-radio__label) {
  color: var(--text-primary);
}

:deep(.el-textarea__inner) {
  color: var(--text-primary);
  background-color: var(--light-bg);
  border-color: var(--border-color);
}

:deep(.el-textarea__inner::placeholder) {
  color: var(--text-muted);
}

:deep(.el-dialog__title) {
  color: var(--primary-color);
}
</style> 