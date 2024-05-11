import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg_file_path = fileURLToPath(new URL('../package/package.json', import.meta.url));

const pkg = JSON.parse(readFileSync(pkg_file_path));

const dev_deps = pkg['devDependencies'];

const peer_deps = (pkg['peerDependencies'] ??= {});
const deps = (pkg['dependencies'] ??= {});

peer_deps['svelte'] = dev_deps['svelte'];
deps['pdfjs-dist'] = dev_deps['pdfjs-dist'];
deps['esm-env'] = dev_deps['esm-env'];

delete pkg['devDependencies'];
delete pkg['pnpm'];

const final_pkg = JSON.stringify(pkg, null, '\t');

writeFileSync(pkg_file_path, final_pkg);
