import { message } from 'ant-design-vue'

const Message = (obj) => {
  if (obj && obj.type) {
    switch (obj.type) {
      case 'success':
        message.success(obj.message)
        break
      case 'error':
        message.error(obj.message)
        break
      case 'info':
        message.info(obj.message)
        break
      case 'warning':
        message.warning(obj.message)
        break
      case 'warn':
        message.warn(obj.message)
        break
      case 'loading':
        message.loading(obj.message)
        break
    }
  }
}

export default Message
