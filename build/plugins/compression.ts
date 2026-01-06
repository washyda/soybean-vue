import viteCompression from 'vite-plugin-compression';
export function setupCompression(viteEnv: Env.ImportMeta) {
  return viteCompression({
    disable: viteEnv.VITE_PLUGIN_COMPRESSION === 'N'
  });
}
