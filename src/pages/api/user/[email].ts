export default (req, res) => {
	const {
		query: { email },
	} = req;

	res.end(`Post: ${email}`);
};
