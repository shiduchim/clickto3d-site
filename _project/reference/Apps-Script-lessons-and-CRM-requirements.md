Important Technical Background — Google Apps Script and CRM

I am building a new CRM, and I want you to know about a serious problem we encountered in a previous project, how we solved it, and what architecture we eventually used.

1. The original Google problem

We previously built a multilingual questionnaire for shadchanim using Google Apps Script and Google Sheets.

Initially, the questionnaire's website was hosted directly through Google Apps Script.

We encountered this error:

"Sorry, unable to open the file at this time."

It happened especially when someone had multiple Google accounts signed in on their phone or browser.

The questionnaire would sometimes open in Incognito mode but fail in normal Chrome.

The problem was associated with Google's handling of multiple signed-in accounts and the Apps Script-hosted page.

This was unacceptable because the questionnaire needed to work reliably for ordinary users, regardless of their Google account configuration.

2. The solution we chose

We separated the frontend from the Google backend.

Frontend: GitHub Pages, hosting a normal static HTML, CSS, and JavaScript website.

Backend: Google Apps Script, connected to a private Google Sheet.

Database: Google Sheets.

The public-facing website was no longer hosted by Google Apps Script.

Our survey URL became:

https://shiduchim.github.io/livesite/survey/

The website sent data to Google Apps Script, which validated and stored the information in Google Sheets.

Users did not need to sign in to Google, and multiple Google accounts no longer prevented the survey page itself from opening.

3. A second important problem: false save failures

After moving the frontend to GitHub Pages, we also experienced a submission-confirmation issue.

Sometimes the form displayed "Could not save" after approximately 27 seconds, even though the submitted data had actually been saved successfully to Google Sheets.

The earlier implementation used a POST request with mode: 'no-cors', which prevented the browser from reading the server's response.

It then relied on separate JSONP requests to check whether the submission had been saved.

Those confirmation requests could fail when Google account cookies interfered, resulting in a false error.

The solution we developed was:

Use a normal POST request with a text/plain request body and credentials: 'omit', avoiding cookies and unnecessary CORS preflight requests.

Where Google's response is readable, use the Apps Script doPost success response directly.

Where the response cannot be read because of cross-origin restrictions or redirects, use a bounded confirmation fallback to verify the saved submission ID.

Every submission gets a unique ID. Retrying must reuse the same ID so it does not create duplicate records.

Only display a success message after the server has confirmed the data was saved.

Do not show a failure simply because a separate status-check request failed. Distinguish between confirmed failure and an unknown result.

Important: Google Apps Script cross-origin behavior must be tested in actual browsers. Do not assume that a successful network POST always produces a readable JSON response.

4. Google Apps Script deployment

For our public, anonymous questionnaire, the deployment settings were:

Deploy: Web app
Execute as: Me
Who has access: Anyone

After updating Apps Script code, we needed to:

Deploy → Manage deployments → Edit the existing deployment → New version → Deploy.

Simply saving the code was not sufficient to update the live deployment.

Creating an entirely new deployment could also change the endpoint URL.

We discovered that an outdated backend deployment could cause problems when a newer frontend submitted fields the old script did not expect.

Always confirm that the frontend and deployed backend versions are compatible.

5. Important difference for my new CRM

Unlike the anonymous questionnaire, a CRM may contain private contacts, emails, notes, and other confidential information.

Do not blindly reuse the questionnaire's publicly accessible backend settings for private CRM records.

I want the same reliable separation between frontend and backend, but with proper authentication and authorization, server-side access controls, and secure data storage.

An unrestricted Apps Script deployment running as the owner must not expose private CRM data or unrestricted editing operations to anonymous users.

If the new CRM integrates Gmail, use an authorized Google integration and appropriate permissions. Do not attempt to bypass account security or expose Gmail access tokens.

Evaluate whether Apps Script and Sheets are suitable for the CRM's actual security, user count, and data requirements, or whether a different backend is necessary.

6. Requirements for this new project

I want a clean, modern, fast CRM that works reliably on Windows desktop and mobile phones.

Please use the lessons from our previous project:

Avoid the Google multi-account login problem.

Prefer a frontend hosted independently from Google Apps Script when appropriate.

Do not rely on Google-hosted frontend pages for an experience that must work without Google sign-in.

Prevent false success and false failure messages.

Prevent duplicate records during retries.

Make saving and editing reliable.

Handle weak connections, timeouts, and interrupted requests.

Provide proper security and access controls.

Keep deployment and updating simple.

Test in normal Chrome, Incognito, mobile browsers, and with multiple Google accounts signed in.

Preserve existing data when updating the application.

Before coding, explain your recommended architecture and how it avoids the problems above.

I want to keep the development straightforward, preferably using GitHub Pages where appropriate, but reliability and data security are more important than forcing a particular technology.

Then we can design the specific CRM functions.