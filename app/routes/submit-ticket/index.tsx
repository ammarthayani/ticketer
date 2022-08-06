import type { ActionFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { Transition } from '@tailwindui/react';
import { useState } from 'react';
import type { Ticket } from '~/utils/ticket.server';
import { createTicket } from '../../utils/ticket.server';

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const values = Object.fromEntries(formData);

	try {
		return createTicket(values as Ticket);
	} catch (e) {
		return e;
	}
};

export default function Index() {
	const [test, setTest] = useState(true);
	const actionData = useActionData();
	const isSuccess = actionData?.id
		? 'success'
		: actionData?.error
		? 'error'
		: 'idle';

	console.log(isSuccess);

	return (
		<main>
			<Transition
				show={isSuccess === 'success' ? false : true}
				enter="transition-scale duration-300"
				enterTo="scale-100"
				enterFrom="scale-0"
				leave="transition-scale duration-0"
				leaveFrom="scale-100"
				leaveTo="scale-0"
			>
				<section className="bg-white">
					<div className={`py-8 lg:py-16 px-4 mx-auto max-w-screen-md`}>
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
									required
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
			</Transition>
			<Transition
				show={isSuccess === 'success' ? true : false}
				enter="transition-scale duration-300"
				enterTo="scale-100"
				enterFrom="scale-0"
				leave="transition-scale duration-0"
				leaveFrom="scale-100"
				leaveTo="scale-0"
			>
				<section>
					<div className=" flex h-screen text-center items-center justify-center">
						<div
							className={` p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md`}
						>
							<h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 ">
								Your issue has been submitted
							</h5>
							<p className="mb-4 font-normal text-gray-700">
								A team member will review you case and will get back to you
								soon.
							</p>
							<button className=" items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
								<Link to="/submit-ticket">Submit Another Ticket</Link>
							</button>
						</div>
					</div>
				</section>
			</Transition>
		</main>
	);
}
