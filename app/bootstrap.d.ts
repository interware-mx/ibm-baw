declare module 'bootstrap/dist/js/bootstrap' {
  // @ts-expect-error: Debería de tipar correctamente
  const bootstrap: any
  export default bootstrap
}