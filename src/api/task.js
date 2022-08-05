import request from '@/utils/request'

/**
 * 获取所有工单类型
 * @returns promise
 */

export const getTaskType = () => {
  return request({
    url: '/task-service/taskType/list'
  })
}
