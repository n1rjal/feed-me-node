# Feed Me Node

Feed Me Node is a REST API-based application that allows for easy subscription to various data feeds. The application retrieves data from REST API endpoints and casts it to subscribers using Server Sent Events (SSE) or Websockets. This enables users to easily subscribe to data feeds and receive real-time updates without having to constantly poll the API endpoint.

In the future, we plan to add email notifications and other forms of notifications to further enhance the user experience. Additionally, we are planning to add a dashboard to the application to provide users with a more comprehensive view of their subscribed feeds.

## Installation

To install Feed Me Node, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies by running `pnpm install`
3. Start the server by running `pnpm start`

## Usage

To use Feed Me Node, follow these steps:

1. Navigate to the application in your web browser
2. Subscribe to the desired data feeds using either SSE or Websockets
3. Wait for real-time updates to be pushed to your subscribed feeds
