export const Message = (message: DTO.Message) => {
	return (
		<div>
			<div>{message.body}</div>
			<div>{message.author}</div>
		</div>
	);
};
