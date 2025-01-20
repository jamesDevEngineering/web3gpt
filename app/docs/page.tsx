import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import { join } from "path";

export default async function DocsPage() {
	const content = readFileSync(join(process.cwd(), "docs/index.mdx"), "utf-8");

	return (
		<div>
			<MDXRemote source={content} />
		</div>
	);
}
