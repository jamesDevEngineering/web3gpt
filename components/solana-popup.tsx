"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function SolanaPopup() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Show popup after a short delay
		const timer = setTimeout(() => {
			setIsOpen(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent pb-2">
						🎉 Exciting News! 🎉
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center space-y-4 py-4">
					<p className="text-center text-lg font-semibold">
						We&apos;re adding Solana support to celebrate our launch on Pump
						Fun! 🚀
					</p>
					<div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg w-full">
						<div className="space-y-2">
							<div className="flex flex-col space-y-2">
								<div className="flex items-start justify-between gap-4">
									<span className="font-semibold whitespace-nowrap">CA:</span>
									<span className="text-purple-600 dark:text-purple-400 text-right break-all">
										Coming Soon
									</span>
								</div>
								<div className="flex items-start justify-between gap-4">
									<span className="font-semibold whitespace-nowrap">
										Dex Screener:
									</span>
									<span className="text-purple-600 dark:text-purple-400 text-right break-all">
										Coming Soon
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
