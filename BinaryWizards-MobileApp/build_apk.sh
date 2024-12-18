#!/bin/bash

# Exécuter la commande EAS Build et capturer la sortie
echo "Starting EAS build for Android..."
BUILD_OUTPUT=$(npx eas build --platform android --profile preview)

# Extraire le lien de l'APK depuis la sortie
BUILD_URL=$(echo "$BUILD_OUTPUT" | grep -o "https://expo.dev/artifacts/[^ ]*")

# Vérifier si le lien a été généré correctement
if [ -n "$BUILD_URL" ]; then
  echo "Build successful! APK available at: $BUILD_URL"
  # Exporter le lien dans une variable pour une utilisation ultérieure
  export EAS_BUILD_URL="$BUILD_URL"
else
  echo "Build failed or URL not found."
  exit 1
fi

# Exemple d'utilisation de la variable
echo "Using APK URL: $EAS_BUILD_URL"