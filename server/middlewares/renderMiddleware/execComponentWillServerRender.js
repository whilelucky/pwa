export default (branches, ctx) => {
  const promises = branches.map(async (branch) => {
    let { component } = branch.route;
    const context = {
      match: branch.match,
      ...ctx,
    };

    if (component.preload) {
      const loadedComponent = await component.preload();
      component = loadedComponent.default;
    }

    if (component.componentWillServerRender) {
      return Promise
        .resolve(component.componentWillServerRender(context))
        .catch(() => {});
    }

    return Promise.resolve();
  });

  return Promise.all(promises);
};
