// Minimal typing for the Product-Gallery bundle.
declare global {
    interface CloudinaryGalleryWidget {
        render(): void;
        destroy(): void;
    }

    interface Window {
        cloudinary?: {
            galleryWidget(cfg: unknown): CloudinaryGalleryWidget;
        };
    }
}

export { };
  