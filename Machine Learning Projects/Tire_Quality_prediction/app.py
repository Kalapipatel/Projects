import os
import numpy as np
import torch
import pickle
from flask import Flask, request, render_template
from PIL import Image
import torchvision.transforms as transforms
import torchvision.models as models

# Initialize Flask app
app = Flask(__name__)

# Ensure the "static/uploads" folder exists
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load all five models from the main folder
models_dict = {
    "svm": pickle.load(open("svm_classifier.pkl", "rb")),
    "random_forest": pickle.load(open("rf_classifier.pkl", "rb")),
    "logistic_regression": pickle.load(open("log_reg_classifier.pkl", "rb")),
    "mlp": pickle.load(open("mlp_classifier.pkl", "rb")),
    "naive_bayes": pickle.load(open("nb_classifier.pkl", "rb"))
}


# Load VGG16 for feature extraction
vgg = models.vgg16(pretrained=True)
vgg_features = torch.nn.Sequential(*list(vgg.children())[:-1])  # Remove last layer
vgg_features.eval()

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def extract_features(image_path):
    """Extract VGG16 features from the uploaded image."""
    image = Image.open(image_path).convert("RGB")
    image = transform(image)
    image = image.unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        features = vgg_features(image)
        features = torch.flatten(features, start_dim=1).numpy()

    return features

@app.route("/", methods=["GET", "POST"])
def home():
    prediction_text = ""
    uploaded_image = None

    if request.method == "POST":
        print("Received POST request.")  # Debug

        # Get selected model from button click
        selected_model = request.form.get("model")
        print(f"Selected Model: {selected_model}")  # Debug

        # Get uploaded image
        if "file" not in request.files:
            print("No file found in request.")
            prediction_text = "No file uploaded."
        else:
            file = request.files["file"]
            if file.filename == "":
                print("No file selected.")
                prediction_text = "No file selected."
            else:
                # Save uploaded file
                filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
                file.save(filepath)
                print(f"File saved to {filepath}")  # Debug

                # Extract features and predict
                try:
                    features = extract_features(filepath)
                    model = models_dict.get(selected_model)
                    if model:
                        prediction = model.predict(features)
                        prediction_text = f"Predicted Tire Quality: {prediction[0]}"
                        uploaded_image = filepath
                    else:
                        print("Invalid model selection.")
                        prediction_text = "Invalid model selection."
                except Exception as e:
                    print(f"Error during prediction: {e}")
                    prediction_text = f"Error: {str(e)}"

    return render_template("index.html", prediction_text=prediction_text, uploaded_image=uploaded_image)



if __name__ == "__main__":
    app.run(debug=True)
