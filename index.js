import { Wasteof2Auth, Wasteof2 } from 'wasteof-client'

let username = 'jeffalo';
let password = 'bacon';
const wasteof = new Wasteof2Auth(username, password);
const wastatic = new Wasteof2();

await wasteof.login()
wasteof.listen(async (event) => {
    if (event.type == 'updateMessageCount') {
	await wastatic.getWallComments(username, 0)
	    .then(data => {
		replyToComment(data.comments[0]);
	    });
    }
});

async function replyToComment(comment) {
  if (!comment) return;
  let postername = comment.poster.name; // username the one leaving the comment
  let posterid = comment.poster.id; // id of the one leaving the comment
  let content = comment.content; // content of the comment
  let commentid = comment._id; // id of the comment
  let time = comment.time; // timestamp of the comment
  let responded = false; // if the bot already responded

 	await wastatic.getRepliesToComment(commentid, 0)
  .then(data => {
    if (!data[0]) return;
    if (data[0].poster.name == username) responded = true;
  })

  /* DO STUFF HERE */
  if (responded) return; // if the bot already responded to the comment, stop the function
  wasteof.postWallComment(username, "Message content here...", commentid); // reply to the comment
}
