import { type Metadata } from "next";
import { DocsNavigation } from "@/components/docs/navigation";

export const metadata: Metadata = {
	title: "Documentation - Web3GPT",
	description:
		"Documentation for Web3GPT - AI-powered smart contract development",
};

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex gap-8">
				<DocsNavigation />
				<div className="flex-1">
					<div className="prose dark:prose-invert max-w-none">{children}</div>
				</div>
			</div>
		</div>
	);
}
