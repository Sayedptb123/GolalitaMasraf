import firebase_admin
from firebase_admin import credentials, messaging
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
_logger = logging.getLogger(__name__)  # Use __name__

def _push_notification_to_employee_call():
    # Path to your Firebase Admin SDK JSON file
    firebase_json_path = "./fcm.json"

    # Check if Firebase Admin SDK is already initialized
    try:
        # Initialize Firebase Admin SDK
        cred = credentials.Certificate(firebase_json_path)
        firebase_admin.initialize_app(cred)
        _logger.info("Firebase Admin SDK initialized successfully.")
    except Exception as e:
        _logger.error(f"Error initializing Firebase Admin SDK: {e}")
        return False  # Exit if initialization fails

    # Notification content
    message_title = "Test Notification"
    message_body = "This is a test notification."

    # Configurable parameters for notification icons and images
    icon_url = "https://www.golalita.com/web/image/2344-d3502dc4/Logo.png"
    image_url = "https://www.golalita.com/web/image/2344-d3502dc4/Logo.png"

    # Data payload with custom fields
    data_message = {
        "body": message_body,
        "title": message_title,
        "merchant_id": "32141",
        "product_id": "54321",
        "icon_url": icon_url,
        "image_url": image_url
    }

    _logger.info(f"Data message payload: {data_message}")

    # Use test device tokens for testing
    test_device_tokens = [
        "dwDZUE0TQYmHFsWAqFrZRW:APA91bEjpjbKrQg13cqqgR_QeWQZqhX8VHuy98GQFfBkg3DqaVAHdJDKJL2ivnaEummEwp9Y68npVUwzlCofBs9yj_yw8NjXenHOwjmMdwH8DeoEmFBedBA"
    ]

    _logger.info(f"Sending push notification to test devices: {test_device_tokens}")

    # Prepare the message for each test device token
    responses = []
    for fcm_token in test_device_tokens:
        message = messaging.Message(
            token=fcm_token,
            notification=messaging.Notification(
                title=message_title,
                body=message_body,
                image=image_url  # Set the image URL for notifications
            ),
            data=data_message  # Data message contains additional custom fields
        )
        try:
            # Send notification to each device token
            response = messaging.send(message)
            responses.append(response)
            _logger.info(f"Notification sent successfully to token: {fcm_token}, Response: {response}")
        except Exception as e:
            _logger.error(f"Error sending notification to token {fcm_token}: {str(e)}")

    return True


if __name__ == "__main__":
    _push_notification_to_employee_call()