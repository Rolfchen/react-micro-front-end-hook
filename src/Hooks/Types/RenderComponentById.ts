export type RenderComponentById = (
  componentName: string,
  domId: string,
  props?: {
    [propName: string]: any
  }
) => void
