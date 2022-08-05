import { redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const values = Object.fromEntries(formData);

	console.log(values);

	return;
};

export default function Index() {
	return (
		<section className="bg-white">
			<div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
				<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
					Submit a Ticket
				</h2>
				<p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
					Enter your information below and a team member will contact you to
					assist.
				</p>
				<Form method="post" className="space-y-8">
					<div>
						<label
							htmlFor="name"
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Your name
						</label>
						<input
							type="text"
							name="name"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
							placeholder="Full Name"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Email
						</label>
						<input
							type="text"
							name="email"
							className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
							placeholder="example@example.com"
							required
						/>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="issue"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Your issue
						</label>
						<textarea
							name="issue"
							rows={6}
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-red-500 focus:border-red-500"
							placeholder="Describe your issue..."
						></textarea>
					</div>
					<button
						type="submit"
						className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
					>
						Send Ticket
					</button>
				</Form>
			</div>
		</section>
	);
}
