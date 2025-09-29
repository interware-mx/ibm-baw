declare module 'bootstrap/dist/js/bootstrap' {
  // @ts-expect-error: Debería de tipar correctamente
  const bootstrap: unknown
  export default bootstrap
}