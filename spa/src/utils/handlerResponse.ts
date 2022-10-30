export const handlerResponse = (props: any) => {
  return props.hasOwnProperty('data')
    ? props.data.hasOwnProperty('success')
      ? props
      : {
          ...props,
          data: {
            success: false,
            message: 'Error server.',
          },
        }
    : {
        ...props,
        data: {
          success: false,
          message: 'Error server.',
        },
      }
}
