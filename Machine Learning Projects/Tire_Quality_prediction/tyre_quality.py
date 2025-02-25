#!/usr/bin/env python
# coding: utf-8

# In[1]:


import torch
from sklearn.preprocessing import StandardScaler


# In[2]:


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)


# In[3]:


import os
from PIL import Image


# In[4]:


dataset_folder = './Dataset of defective and good condition tyres'
img_path = './Dataset of defective and good condition tyres/training/defective/Defective (1).jpg'
training_dataset_path = './Dataset of defective and good condition tyres/training'
testing_dataset_path = './Dataset of defective and good condition tyres/testing'
classes = sorted(os.listdir(dataset_folder + '/training'))


# In[5]:


img = Image.open(img_path)
img


# In[6]:


classes


# In[7]:


import numpy as np


# In[8]:


np.random.seed(0)
torch.manual_seed(0)


# In[9]:


from PIL import ImageOps, ImageFilter
import torchvision.transforms.functional as F
from torchvision import transforms


# In[10]:


# Transformation function with fixed resize
def image_transform():
    transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize to a fixed size
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])
    return transform



# In[11]:


transform = image_transform()


# In[12]:


import torchvision
def load_dataset(path,transform_img):
  data = torchvision.datasets.ImageFolder(root=path, transform=transform)
  return data


# In[13]:


training_dataset = load_dataset(training_dataset_path,transform)
training_dataset


# In[14]:


testing_dataset = load_dataset(testing_dataset_path,transform)
testing_dataset


# In[15]:


import matplotlib.pyplot as plt
import torchvision.transforms as transforms
import numpy as np


# In[16]:


def show_transformed_image(image_path, transform):
    # Load image
    img = Image.open(image_path)

    # Apply the transformations
    transformed_img = transform(img)

    # Convert the tensor back to numpy array for visualization
    img_np = transformed_img.numpy().transpose((1, 2, 0))  # Convert to HWC format for matplotlib

    # Undo normalization to bring values back to [0, 1] range
    img_np = img_np * 0.5 + 0.5  # Reverse normalization: img_np = (img_np * std + mean)

    # Display the transformed image
    plt.imshow(img_np)
    plt.axis('off')
    plt.show()


# In[17]:


# Get the image transformation pipeline
transform = image_transform()

# Show the transformed image
show_transformed_image(img_path, transform)


# In[18]:


from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize images to 224x224
    transforms.ToTensor(),  # Convert to Tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize as per VGG requirements
])


# In[19]:


from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

# Example dataset paths
train_dataset = ImageFolder('./Dataset of defective and good condition tyres/training', transform=transform)
test_dataset = ImageFolder('./Dataset of defective and good condition tyres/testing', transform=transform)

# DataLoaders
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)


# In[20]:


import torch

# Updated feature extraction with GPU support
def extract_features(loader, model, output_size=(7, 7)):
    features_list = []
    device = 'cuda' if torch.cuda.is_available() else 'cpu'  # Use GPU if available
    model = model.to(device)  # Move model to GPU
    with torch.no_grad():
        for images, _ in loader:
            images = images.to(device)  # Move images to GPU
            features = model(images)  # Extract features
            pooled_features = F.adaptive_avg_pool2d(features, output_size)  # Apply adaptive pooling
            features_list.append(pooled_features.view(pooled_features.size(0), -1).cpu().numpy())  # Flatten
    return features_list


# In[21]:


train_loader = torch.utils.data.DataLoader(dataset = training_dataset, batch_size = 16,shuffle=True)


# In[22]:


from torch.utils.data import SubsetRandomSampler,DataLoader,Dataset


# In[23]:


test_loader = torch.utils.data.DataLoader(dataset= testing_dataset, shuffle=True, batch_size=16)


# In[24]:


import torch.nn as nn
import torchvision.models as models


# In[25]:


# vgg = models.vgg16(pretrained=True)
# vgg_features = nn.Sequential(*list(vgg.children())[:-1])
# vgg_features.eval()

# for param in vgg_features.parameters():
#     param.requires_grad = False


# In[26]:


import os
from torchvision import models
import torch.nn as nn

# Step 1: Clear the cache to remove potentially corrupted weights
torch_cache_dir = os.path.expanduser('~/.cache/torch/hub/checkpoints/')
if os.path.exists(torch_cache_dir):
    for file in os.listdir(torch_cache_dir):
        if "vgg16" in file:  # Check for VGG16 weights
            os.remove(os.path.join(torch_cache_dir, file))

# Step 2: Load the pretrained VGG16 model
vgg = models.vgg16(pretrained=True)

# Step 3: Extract features from the VGG16 model (remove the last layer)
vgg_features = nn.Sequential(*list(vgg.children())[:-1])
vgg_features.eval()

# Step 4: Freeze all the parameters to prevent backpropagation through this model
for param in vgg_features.parameters():
    param.requires_grad = False

# Now, `vgg_features` is ready for use in your ML project.
print("VGG16 features model loaded successfully and is ready for use.")


# In[27]:


import torch.nn.functional as F

# Updated feature extraction with adaptive pooling
def extract_features(loader, model, output_size=(7, 7)):
    features_list = []
    with torch.no_grad():
        for images, _ in loader:
            # Pass the images through the VGG model to get the features
            features = model(images)
            # Apply adaptive pooling to standardize the feature map size
            pooled_features = F.adaptive_avg_pool2d(features, output_size)
            features_list.append(pooled_features.view(pooled_features.size(0), -1).cpu().numpy())  # Flatten
    return features_list


# In[29]:


# train_features = extract_features(train_loader, vgg_features)
# test_features = extract_features(test_loader, vgg_features)

train_features = extract_features(train_loader, vgg_features)
test_features = extract_features(test_loader, vgg_features)


# In[30]:


train_features = torch.tensor(np.concatenate(train_features, axis=0))
test_features = torch.tensor(np.concatenate(test_features, axis=0))


# In[31]:


def extract_features_for_visualization(loader, model, output_size=(7, 7)):
    features_list = []
    with torch.no_grad():
        for images, _ in loader:
            features = model(images)
            pooled_features = F.adaptive_avg_pool2d(features, output_size)
            features_list.append(pooled_features.cpu())
    return features_list

# Extract features for visualization
train_features_for_vis = extract_features_for_visualization(train_loader, vgg_features)


# In[32]:


import matplotlib.pyplot as plt

def visualize_feature_maps(features, num_images=5, num_channels=6):
    for i in range(num_images):
        fig, axes = plt.subplots(1, num_channels, figsize=(20, 5))
        for j in range(num_channels):
            feature_map = features[i][0][j]  # Select the feature map for the i-th image and j-th channel
            axes[j].imshow(feature_map.detach().numpy(), cmap='gray')
            axes[j].axis('off')
        plt.show()

# Visualize first 5 images with 6 channels
visualize_feature_maps(train_features_for_vis, num_images=5, num_channels=6)


# In[33]:


import torch
import matplotlib.pyplot as plt

# Function to visualize feature maps
def visualize_feature_maps(model, image, layers=[0, 5, 10, 17, 24]):
    model.eval()
    fig, axes = plt.subplots(len(layers), 8, figsize=(12, len(layers) * 2))

    for idx, layer_idx in enumerate(layers):
        x = image.unsqueeze(0)  # Add batch dimension for each layer

        # Forward pass up to the selected layer
        x = model[:layer_idx+1](x)

        # Get the first 8 feature maps
        for i in range(8):
            ax = axes[idx, i]
            ax.imshow(x[0, i].detach().cpu().numpy(), cmap='viridis')
            ax.axis('off')
        axes[idx, 0].set_ylabel(f'Layer {layer_idx}')
    plt.show()

img_tensor = transform(img)
visualize_feature_maps(vgg_features, img_tensor)


# In[34]:


# Flatten features for SVM input
X_train = np.vstack(train_features)  # Each entry should be of the same flattened size now
X_val = np.vstack(test_features)


# In[35]:


from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.preprocessing import LabelBinarizer
from sklearn import svm


# In[36]:


# Adjusted to extract features and corresponding labels consistently
def extract_features_and_labels(loader, model, output_size=(7, 7)):
    features_list = []
    labels_list = []
    with torch.no_grad():
        for images, labels in loader:
            # Pass images through the model to get features
            features = model(images)
            # Apply adaptive pooling to ensure fixed output size
            pooled_features = F.adaptive_avg_pool2d(features, output_size)
            # Flatten pooled features
            flattened_features = pooled_features.view(pooled_features.size(0), -1)
            features_list.append(flattened_features.cpu().numpy())
            labels_list.extend(labels.cpu().numpy())  # Collect corresponding labels
    return np.vstack(features_list), np.array(labels_list)

# Extract features and labels for training and validation sets
X_train, y_train = extract_features_and_labels(train_loader, vgg_features)
X_val, y_val = extract_features_and_labels(test_loader, vgg_features)




# In[37]:


# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_val = scaler.transform(X_val)

# Train and evaluate the SVM
svm_classifier = svm.SVC(kernel='linear', probability=True)
svm_classifier.fit(X_train, y_train)

# Predict and evaluate
y_pred = svm_classifier.predict(X_val)
accuracy = accuracy_score(y_val, y_pred)

print(f"SVM Classification Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"SVM Classification F1 Score: {f1:.2f}")

# Calculate AUC Score
# For multiclass, binarize labels
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    y_pred_proba_binarized = svm_classifier.predict_proba(X_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba_binarized, average="weighted", multi_class="ovr")
else:
    y_pred_proba = svm_classifier.predict_proba(X_val)[:, 1]  # Extract probabilities for positive class
    auc = roc_auc_score(y_val, y_pred_proba)
print(f"SVM Classification AUC: {auc:.2f}")


# In[38]:


from sklearn.metrics import confusion_matrix, precision_score, recall_score, log_loss


# In[39]:


# Predict probabilities for loss computation
y_pred_proba = svm_classifier.predict_proba(X_val)

# Calculate Loss (Log Loss)
loss = log_loss(y_val, y_pred_proba)
print(f"SVM Classification Log Loss: {loss:.4f}")

# Calculate Accuracy
accuracy = accuracy_score(y_val, y_pred)
print(f"SVM Classification Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"SVM Classification F1 Score: {f1:.2f}")

# Calculate AUC Score
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba, average="weighted", multi_class="ovr")
else:
    auc = roc_auc_score(y_val, y_pred_proba[:, 1])
print(f"SVM Classification AUC: {auc:.2f}")

# Calculate Precision and Recall
precision = precision_score(y_val, y_pred, average='weighted')
recall = recall_score(y_val, y_pred, average='weighted')
print(f"SVM Classification Precision: {precision:.2f}")
print(f"SVM Classification Recall: {recall:.2f}")

# Summary in Matrix Form
metrics_matrix = np.array([
    ["Metric", "Value"],
    ["Accuracy", f"{accuracy * 100:.2f}%"],
    ["F1 Score", f"{f1:.2f}"],
    ["AUC", f"{auc:.2f}"],
    ["Log Loss", f"{loss:.4f}"],
    ["Precision", f"{precision:.2f}"],
    ["Recall", f"{recall:.2f}"]
])

# Display metrics matrix
for row in metrics_matrix:
    print(f"{row[0]:<15}: {row[1]}")


# In[40]:


from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, log_loss, precision_score, recall_score
from sklearn.preprocessing import LabelBinarizer
import numpy as np

# Train Random Forest model
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train)

# Predict labels
y_pred = rf_classifier.predict(X_val)

# Predict probabilities for loss and AUC computation
y_pred_proba = rf_classifier.predict_proba(X_val)

# Calculate Accuracy
accuracy = accuracy_score(y_val, y_pred)
print(f"Random Forest Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"Random Forest F1 Score: {f1:.2f}")

# Calculate Log Loss
loss = log_loss(y_val, y_pred_proba)
print(f"Random Forest Log Loss: {loss:.4f}")

# Calculate AUC Score
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba, average="weighted", multi_class="ovr")
else:
    auc = roc_auc_score(y_val, y_pred_proba[:, 1])
print(f"Random Forest AUC: {auc:.2f}")

# Calculate Precision and Recall
precision = precision_score(y_val, y_pred, average='weighted')
recall = recall_score(y_val, y_pred, average='weighted')
print(f"Random Forest Precision: {precision:.2f}")
print(f"Random Forest Recall: {recall:.2f}")

# Summary in Matrix Form
metrics_matrix = np.array([
    ["Metric", "Value"],
    ["Accuracy", f"{accuracy * 100:.2f}%"],
    ["F1 Score", f"{f1:.2f}"],
    ["AUC", f"{auc:.2f}"],
    ["Log Loss", f"{loss:.4f}"],
    ["Precision", f"{precision:.2f}"],
    ["Recall", f"{recall:.2f}"]
])

# Display metrics matrix
for row in metrics_matrix:
    print(f"{row[0]:<15}: {row[1]}")


# In[41]:


from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, log_loss, precision_score, recall_score
from sklearn.preprocessing import LabelBinarizer
import numpy as np

# Train Logistic Regression model
log_reg_classifier = LogisticRegression(max_iter=1000)
log_reg_classifier.fit(X_train, y_train)

# Predict labels
y_pred = log_reg_classifier.predict(X_val)

# Predict probabilities for loss and AUC computation
y_pred_proba = log_reg_classifier.predict_proba(X_val)

# Calculate Accuracy
accuracy = accuracy_score(y_val, y_pred)
print(f"Logistic Regression Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"Logistic Regression F1 Score: {f1:.2f}")

# Calculate Log Loss
loss = log_loss(y_val, y_pred_proba)
print(f"Logistic Regression Log Loss: {loss:.4f}")

# Calculate AUC Score
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba, average="weighted", multi_class="ovr")
else:
    auc = roc_auc_score(y_val, y_pred_proba[:, 1])
print(f"Logistic Regression AUC: {auc:.2f}")

# Calculate Precision and Recall
precision = precision_score(y_val, y_pred, average='weighted')
recall = recall_score(y_val, y_pred, average='weighted')
print(f"Logistic Regression Precision: {precision:.2f}")
print(f"Logistic Regression Recall: {recall:.2f}")

# Summary in Matrix Form
metrics_matrix = np.array([
    ["Metric", "Value"],
    ["Accuracy", f"{accuracy * 100:.2f}%"],
    ["F1 Score", f"{f1:.2f}"],
    ["AUC", f"{auc:.2f}"],
    ["Log Loss", f"{loss:.4f}"],
    ["Precision", f"{precision:.2f}"],
    ["Recall", f"{recall:.2f}"]
])

# Display metrics matrix
for row in metrics_matrix:
    print(f"{row[0]:<15}: {row[1]}")


# In[42]:


from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, log_loss, precision_score, recall_score
from sklearn.preprocessing import LabelBinarizer
import numpy as np

# Train Naive Bayes model
nb_classifier = GaussianNB()
nb_classifier.fit(X_train, y_train)

# Predict labels
y_pred = nb_classifier.predict(X_val)

# Predict probabilities for loss and AUC computation
y_pred_proba = nb_classifier.predict_proba(X_val)

# Calculate Accuracy
accuracy = accuracy_score(y_val, y_pred)
print(f"Naive Bayes Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"Naive Bayes F1 Score: {f1:.2f}")

# Calculate Log Loss
loss = log_loss(y_val, y_pred_proba)
print(f"Naive Bayes Log Loss: {loss:.4f}")

# Calculate AUC Score
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba, average="weighted", multi_class="ovr")
else:
    auc = roc_auc_score(y_val, y_pred_proba[:, 1])
print(f"Naive Bayes AUC: {auc:.2f}")

# Calculate Precision and Recall
precision = precision_score(y_val, y_pred, average='weighted')
recall = recall_score(y_val, y_pred, average='weighted')
print(f"Naive Bayes Precision: {precision:.2f}")
print(f"Naive Bayes Recall: {recall:.2f}")

# Summary in Matrix Form
metrics_matrix = np.array([
    ["Metric", "Value"],
    ["Accuracy", f"{accuracy * 100:.2f}%"],
    ["F1 Score", f"{f1:.2f}"],
    ["AUC", f"{auc:.2f}"],
    ["Log Loss", f"{loss:.4f}"],
    ["Precision", f"{precision:.2f}"],
    ["Recall", f"{recall:.2f}"]
])

# Display metrics matrix
for row in metrics_matrix:
    print(f"{row[0]:<15}: {row[1]}")


# In[43]:


from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, log_loss, precision_score, recall_score
from sklearn.preprocessing import LabelBinarizer
import numpy as np

# Train MLP model
mlp_classifier = MLPClassifier(hidden_layer_sizes=(128, 64), max_iter=300, random_state=42)
mlp_classifier.fit(X_train, y_train)

# Predict labels
y_pred = mlp_classifier.predict(X_val)

# Predict probabilities for loss and AUC computation
y_pred_proba = mlp_classifier.predict_proba(X_val)

# Calculate Accuracy
accuracy = accuracy_score(y_val, y_pred)
print(f"MLP Classifier Accuracy: {accuracy * 100:.2f}%")

# Calculate F1 Score
f1 = f1_score(y_val, y_pred, average='weighted')
print(f"MLP Classifier F1 Score: {f1:.2f}")

# Calculate Log Loss
loss = log_loss(y_val, y_pred_proba)
print(f"MLP Classifier Log Loss: {loss:.4f}")

# Calculate AUC Score
if len(set(y_val)) > 2:
    lb = LabelBinarizer()
    y_val_binarized = lb.fit_transform(y_val)
    auc = roc_auc_score(y_val_binarized, y_pred_proba, average="weighted", multi_class="ovr")
else:
    auc = roc_auc_score(y_val, y_pred_proba[:, 1])
print(f"MLP Classifier AUC: {auc:.2f}")

# Calculate Precision and Recall
precision = precision_score(y_val, y_pred, average='weighted')
recall = recall_score(y_val, y_pred, average='weighted')
print(f"MLP Classifier Precision: {precision:.2f}")
print(f"MLP Classifier Recall: {recall:.2f}")

# Summary in Matrix Form
metrics_matrix = np.array([
    ["Metric", "Value"],
    ["Accuracy", f"{accuracy * 100:.2f}%"],
    ["F1 Score", f"{f1:.2f}"],
    ["AUC", f"{auc:.2f}"],
    ["Log Loss", f"{loss:.4f}"],
    ["Precision", f"{precision:.2f}"],
    ["Recall", f"{recall:.2f}"]
])

# Display metrics matrix
for row in metrics_matrix:
    print(f"{row[0]:<15}: {row[1]}")



# In[ ]:





# In[44]:


import pickle

pickle.dump(svm_classifier, open("svm_classifier.pkl", "wb"))
pickle.dump(rf_classifier, open("rf_classifier.pkl", "wb"))
pickle.dump(log_reg_classifier, open("log_reg_classifier.pkl", "wb"))
pickle.dump(nb_classifier, open("nb_classifier.pkl", "wb"))
pickle.dump(mlp_classifier, open("mlp_classifier.pkl", "wb"))


# In[ ]:





# In[45]:


import pickle

# Load the trained model
with open("svm_classifier.pkl", "rb") as file:
    svm_model = pickle.load(file)


# In[46]:


from PIL import Image
import torchvision.transforms as transforms
import numpy as np

# Define the transformation (must match training transformations)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to 224x224 as used in training
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize for VGG
])

def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")  # Open image
    image = transform(image)  # Apply transformations
    image = image.unsqueeze(0)  # Add batch dimension
    return image


# In[47]:


import torch
import torchvision.models as models

# Load VGG16 for feature extraction
vgg = models.vgg16(pretrained=True)
vgg_features = torch.nn.Sequential(*list(vgg.children())[:-1])  # Remove last layer
vgg_features.eval()  # Set to evaluation mode

# Function to extract VGG features
def extract_features(image_tensor):
    with torch.no_grad():
        features = vgg_features(image_tensor)  # Pass through VGG
        features = torch.flatten(features, start_dim=1)  # Flatten
    return features.numpy()


# In[48]:


# Load and preprocess the image
image_path = img_path  # Replace with actual image path
image_tensor = preprocess_image(image_path)

# Extract features using VGG16
features = extract_features(image_tensor)

# Predict using the loaded model
prediction = svm_model.predict(features)

print("Predicted Tire Quality:", prediction[0])  # Output the class


# In[ ]:




