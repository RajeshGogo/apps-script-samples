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
// [START apps_script_plus_domains_profile]
/**
 * The following example demonstrates how to retrieve details from a user's
 * Google+ profile.
 */
function getProfile() {
  const userId = 'me';
  try {
    const profile = PlusDomains.People.get(userId);

    Logger.log('ID: %s', profile.id);
    Logger.log('Display name: %s', profile.displayName);
    Logger.log('Image URL: %s', profile.image.url);
    Logger.log('Profile URL: %s', profile.url);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_plus_domains_profile]

// [START apps_script_plus_domains_circle]
/**
 * The following example demonstrates how to create an empty circle for a user
 * within your G Suite domain.
 */
function createCircle() {
  const userId = 'me';
  try {
    let circle = PlusDomains.newCircle();
    circle.displayName = 'Tech support';

    circle = PlusDomains.Circles.insert(circle, userId);
    Logger.log('Created "Tech support" circle with id: ' + circle.id);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_plus_domains_circle]

// [START apps_script_plus_domains_get_posts]
/**
 * The following example demonstrates how to list a user's posts. The returned
 * results contain a brief summary of the posts, including a title. Use the
 * Activities.get() method to read the full details of a post.
 */
function getPosts() {
  const userId = 'me';
  let pageToken;
  let posts;
  do {
    posts = PlusDomains.Activities.list(userId, 'user', {
      maxResults: 100,
      pageToken: pageToken
    });
    if (!posts.items) {
      Logger.log('No result found');
      return;
    }
    // Print the id and object content
    for (const post of posts.items) {
      Logger.log('ID: %s, Content: %s', post.id, post.object.content);
    }
    pageToken = posts.nextPageToken;
  } while (pageToken);
}
// [END apps_script_plus_domains_get_posts]

// [START apps_script_plus_domains_create_post]
/**
 * The following example demonstrates how to create a post that is available
 * to all users within your G Suite domain.
 */
function createPost() {
  const userId = 'me';
  let post = {
    object: {
      originalContent: 'Happy Monday! #caseofthemondays'
    },
    access: {
      items: [{
        type: 'domain'
      }],
      domainRestricted: true
    }
  };
  try {
    post = PlusDomains.Activities.insert(post, userId);
    Logger.log('Post created with URL: %s', post.url);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_plus_domains_create_post]
