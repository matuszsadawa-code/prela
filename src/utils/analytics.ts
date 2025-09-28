// Analytics tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, properties)
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track(eventName, properties)
  }

  // Console log for development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, properties)
  }
}

// Specific tracking functions
export const trackSocialClick = (platform: string) => {
  trackEvent('click_social', { platform })
}

export const trackGalleryItemClick = (itemId: string, category: string) => {
  trackEvent('click_gallery_item', { item_id: itemId, category })
}

export const trackCTAClick = (cta_type: string, location: string) => {
  trackEvent('cta_click', { cta_type, location })
}

export const trackPurchaseIntent = (product: string, price: number) => {
  trackEvent('purchase_intent', { product, price })
}

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page })
}

// UTM parameter extraction
export const getUTMParameters = () => {
  if (typeof window === 'undefined') return {}
  
  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
  }
}
