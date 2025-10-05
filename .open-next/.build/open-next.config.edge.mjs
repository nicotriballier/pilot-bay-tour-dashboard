// open-next.config.ts
var config = {
  default: {
    override: {
      wrapper: "cloudflare",
      converter: "edge",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy"
    }
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare",
      converter: "edge"
    }
  }
};
var open_next_config_default = config;
export {
  open_next_config_default as default
};
