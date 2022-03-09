/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START apps_script_plus_people]
/**
 * The following example demonstrates how to retrieve a list of the people
 * in the user's Google+ circles.
 */
function getPeople() {
  const userId = 'me';
  let people;
  let pageToken = null;
  do {
    people = Plus.People.list(userId, 'visible', {
      pageToken: pageToken
    });
    if (!people.items) {
      Logger.log('No people in your visible circles.');
      return;
    }
    for (const person of people.items) {
      Logger.log(person.displayName);
    }
    pageToken = people.nextPageToken;
  } while (pageToken);
}
// [END apps_script_plus_people]

// [START apps_script_plus_posts]
/**
 * The following example demonstrates how to list a user's posts. The returned
 * results contain a brief summary of the posts, including a list of comments
 * made on the post.
 */
function getPosts() {
  const userId = 'me';
  let posts;
  let pageToken = null;
  do {
    posts = Plus.Activities.list(userId, 'public', {
      maxResults: 10,
      pageToken: pageToken
    });
    if (!posts.items) {
      Logger.log('No posts found.');
    }
    for (const post of posts.items) {
      Logger.log(post.title);
      const comments = Plus.Comments.list(post.id);
      if (comments.items) {
        for (const comment of comments.items) {
          Logger.log(comment.actor.displayName + ': ' +
            comment.object.content);
        }
      }
    }
    pageToken = posts.pageToken;
  } while (pageToken);
}
// [END apps_script_plus_posts]
