"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserFieldAction, storeEmailAction } from "@/lib/actions/chat";
import { useIsClient } from "@/lib/hooks/use-is-client";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { isValidEmail } from "@/lib/utils";
import web3GPTLogo from "@/public/web3gpt-logo.png";

type LandingProps = {
	userId?: string;
	disableAnimations?: boolean;
};

export function Landing({ userId, disableAnimations }: LandingProps) {
	const [validationError, setValidationError] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [localIsSubscribed, setLocalIsSubscribed] = useLocalStorage(
		"email_subscribed",
		false
	);
	const isClient = useIsClient();

	useEffect(() => {
		const fetchIsEmailSubscribed = async () => {
			const backendIsSubscribed = await getUserFieldAction("email_subscribed");
			if (!!backendIsSubscribed === true) {
				setLocalIsSubscribed(true);
			}
		};

		if (localIsSubscribed !== true && userId && isClient) {
			fetchIsEmailSubscribed();
		}
	}, [localIsSubscribed, setLocalIsSubscribed, userId, isClient]);

	async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!isValidEmail(email)) {
			setValidationError("Please enter a valid email");
			return;
		}
		setValidationError(null);
		await storeEmailAction(email);
		setLocalIsSubscribed(true);
		setEmail("");
		toast.success("Thanks for subscribing!");
	}

	return (
		<>
			<div className="grid grid-rows-[auto,auto,1fr] gap-8 mx-auto max-w-2xl h-full md:h-[28rem] bg-background border-gray-600/25 text-center dark:border-gray-600/50 border rounded-2xl md:mb-8 px-4 pt-8 pb-4">
				<Image
					src={web3GPTLogo}
					className="h-12 md:h-16 w-auto place-self-center"
					alt="web3gpt logo"
					priority={true}
					width={120}
					height={60}
				/>
				<div className="space-y-2">
					<p className="max-sm:hidden text-lg font-bold tracking-tight lg:text-2xl lg:font-normal">
						Deploy smart contracts with AI
					</p>
					<p className="text-sm text-purple-500">
						{" "}
						We are pivoting to Solana from ETH!
					</p>
				</div>

				<div className="grid-row-3 grid grid-flow-row gap-1 md:grid-flow-col pb-4 md:pt-4 md:gap-4">
					<div className="mx-3 grid grid-cols-3 content-center gap-1 md:grid-cols-1 md:gap-4">
						<div className="flex justify-center items-center">
							<span className="text-6xl hover:scale-110 transition-transform duration-200">
								🧩
							</span>
						</div>
						<div className="col-span-2 mt-4 text-left md:col-span-1 md:mt-0 md:text-center">
							<h3 className="font-bold md:mb-2">Generate</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Generate smart contracts using prompts.
							</p>
						</div>
					</div>

					<div className="mx-3 grid grid-cols-3 content-center md:grid-cols-1 gap-4">
						<div className="flex justify-center items-center">
							<span className="text-6xl hover:scale-110 transition-transform duration-200">
								🚀
							</span>
						</div>
						<div className="col-span-2 mt-4 text-left md:col-span-1 md:mt-0 md:text-center">
							<h3 className="font-bold md:mb-2">Deploy</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Deploy from chat with Agent deploy or wallet.
							</p>
						</div>
					</div>

					<div className="mx-3 grid grid-cols-3 content-center gap-1 md:grid-cols-1 md:gap-4">
						<div className="flex justify-center items-center">
							<span className="text-6xl hover:scale-110 transition-transform duration-200">
								⚡
							</span>
						</div>
						<div className="col-span-2 mt-4 text-left md:col-span-1 md:mt-0 md:text-center">
							<h3 className="font-bold md:mb-2">Speed Up</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Skip the boilerplate, deploy in seconds.
							</p>
						</div>
					</div>
				</div>
			</div>

			<hr className="mb-4 md:hidden" />

			{isClient && localIsSubscribed === false ? (
				<div className="mx-auto max-w-xl rounded-2xl border-gray-600/25 px-4 text-center dark:border-gray-600/50 md:border">
					<div className="my-4 flex flex-col gap-3">
						<p className="mt-4 scroll-m-20 text-xl tracking-tight">
							Early Access
						</p>

						<p className="px-4 text-xs text-gray-600 dark:text-gray-400">
							Sign up for development updates and early access to latest
							features
						</p>

						<div className="flex justify-center gap-2">
							<form
								className="flex justify-center gap-2"
								onSubmit={handleSubscribe}
							>
								<Input
									className="h-9 w-56 rounded-lg p-2"
									type="text"
									placeholder="Your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button type="submit" className="h-9" size="sm">
									Send
								</Button>
							</form>
						</div>
						{validationError ? (
							<p className="text-xs text-red-500">{validationError}</p>
						) : (
							<p className="mb-4 text-xs text-gray-400">
								{"No spam, promise :)"}
							</p>
						)}
					</div>
				</div>
			) : null}
		</>
	);
}
