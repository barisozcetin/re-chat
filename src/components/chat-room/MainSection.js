import React from 'react';
import PropTypes from 'prop-types';
import ChatroomHeader from './ChatroomHeader';

const MainSection = (props) => {
	return (
		<div className="chatroom__main">
			<ChatroomHeader roomId={props.roomId} onToggle={props.onToggle} pageUrl={props.pageUrl} />
			<div className="chatroom__messages" id="messages">
				<ul className="messages__list" id="ml">
					{props.messages.length > 0 &&
						props.messages.map((msg, key) => (
							<li key={key}>
								<div className="card">
									<div className="card-content">
										<div className="media">
											<div className="media-left">
												<figure className="image is-48x48">
													<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
												</figure>
											</div>
											<div className="media-content">
												<p className="title is-size-5 is-marginless	">
													{msg.user || 'Anonymous'} <small className="is-size-6"> @ {msg.date}</small>
												</p>

												<div className="message-text">
													{msg.message}
													<br />
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>
			<div className="chatroom__new-message field is-grouped">
				<form
					className="chatroom__form"
					onSubmit={(e) => {
						e.preventDefault();
						props.onMessageSubmit();
					}}
				>
					<textarea
						type="text"
						className="textarea"
						rows="3"
						placeholder="Press ctrl+enter or cmd+enter to send"
						value={props.newMessage}
						onChange={props.onMessageChange}
						onKeyUp={(e) => {
							if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
								props.onMessageSubmit();
							}
						}}
					/>
					<input type="submit" value="Send" className="button is-primary full-height" />
				</form>
			</div>
		</div>
	);
};

MainSection.propTypes = {
	messages: PropTypes.array.isRequired,
	newMessage: PropTypes.string.isRequired,
	onMessageChange: PropTypes.func.isRequired,
	onMessageSubmit: PropTypes.func.isRequired,
	roomId: PropTypes.string.isRequired
};

export default MainSection;
