import type { LoaderFunction } from '@remix-run/node';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async () => {};

export default function PusherTest() {
	const [chats, setChats] = useState(['']);
	const pusher = new Pusher('9633b05feeed7420f682', {
		cluster: 'us2',
	});
	const channel = pusher.subscribe('chat');
	useEffect(() => {
		channel.bind('message', (data: any) => {
			setChats((prevState) => [...prevState, data]);
		});
	});

	const newMessage = () => {};

	return (
		<div>
			{chats.map((key) => {
				return <div key={key}></div>;
			})}
			<button onClick={() => newMessage()}></button>
		</div>
	);
}
