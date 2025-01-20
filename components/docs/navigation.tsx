import Link from "next/link";

const navigation = [
	{
		title: "Getting Started",
		links: [
			{ href: "/docs", title: "Introduction" },
			{ href: "/docs/quick-start", title: "Quick Start" },
		],
	},
	{
		title: "Features",
		links: [
			{ href: "/docs/features/deploy", title: "Deploy Contracts" },
			{ href: "/docs/features/agents", title: "AI Agents" },
		],
	},
	{
		title: "Reference",
		links: [{ href: "/docs/chains", title: "Supported Chains" }],
	},
];

export function DocsNavigation() {
	return (
		<nav className="w-64 pr-8">
			<div className="space-y-8">
				{navigation.map((section) => (
					<div key={section.title}>
						<h3 className="font-semibold mb-3">{section.title}</h3>
						<ul className="space-y-2">
							{section.links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</nav>
	);
}
