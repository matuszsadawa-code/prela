// ============================================
// ANALYTICS DATA COLLECTION SYSTEM
// ============================================

// Interface for analytics data
export interface AnalyticsData {
  timestamp: number
  eventName: string
  properties?: Record<string, any>
  utmParameters: Record<string, any>
  sessionId: string
  userAgent: string
  referrer: string
  pageUrl: string
}

// Interface for conversion data
export interface ConversionData {
  timestamp: number
  type: 'click_social' | 'click_gallery' | 'cta_click' | 'purchase_intent' | 'page_view'
  source?: string
  medium?: string
  campaign?: string
  value?: number
  product?: string
}

// Interface for session data
export interface SessionData {
  sessionId: string
  startTime: number
  endTime?: number
  duration?: number
  pageViews: number
  conversions: number
  bounced: boolean
  scrollDepth: number
  lastActivity: number
}

// Interface for device data
export interface DeviceData {
  timestamp: number
  deviceType: 'mobile' | 'tablet' | 'desktop'
  os: string
  browser: string
  screenResolution: string
  language: string
  timezone: string
}

// Interface for behavior data
export interface BehaviorData {
  timestamp: number
  eventType: 'scroll' | 'hover' | 'click' | 'form_interaction' | 'time_on_page'
  section?: string
  scrollDepth?: number
  timeOnPage?: number
  elementId?: string
}

// Local storage key for analytics
const ANALYTICS_STORAGE_KEY = 'prelanding_analytics_data'
const SESSION_ID_KEY = 'prelanding_session_id'
const CONVERSIONS_STORAGE_KEY = 'prelanding_conversions'
const DEVICE_DATA_KEY = 'prelanding_device_data'
const BEHAVIOR_DATA_KEY = 'prelanding_behavior_data'
const SESSION_START_TIME_KEY = 'prelanding_session_start_time'
const SESSION_SCROLL_DEPTH_KEY = 'prelanding_session_scroll_depth'

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

// Detect device type
export const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop'

  const ua = navigator.userAgent
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase())) {
    return 'mobile'
  }
  if (/ipad|android(?!.*mobile)|tablet/i.test(ua.toLowerCase())) {
    return 'tablet'
  }
  return 'desktop'
}

// Detect OS
export const detectOS = (): string => {
  if (typeof window === 'undefined') return 'Unknown'

  const ua = navigator.userAgent
  if (ua.indexOf('Win') > -1) return 'Windows'
  if (ua.indexOf('Mac') > -1) return 'MacOS'
  if (ua.indexOf('Linux') > -1) return 'Linux'
  if (ua.indexOf('Android') > -1) return 'Android'
  if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS'
  return 'Unknown'
}

// Detect browser
export const detectBrowser = (): string => {
  if (typeof window === 'undefined') return 'Unknown'

  const ua = navigator.userAgent
  if (ua.indexOf('Firefox') > -1) return 'Firefox'
  if (ua.indexOf('Chrome') > -1) return 'Chrome'
  if (ua.indexOf('Safari') > -1) return 'Safari'
  if (ua.indexOf('Edge') > -1) return 'Edge'
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera'
  return 'Unknown'
}

// Get screen resolution
export const getScreenResolution = (): string => {
  if (typeof window === 'undefined') return 'Unknown'
  return `${window.screen.width}x${window.screen.height}`
}

// Get or create session ID
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(SESSION_ID_KEY, sessionId)
    localStorage.setItem(SESSION_START_TIME_KEY, Date.now().toString())
  }
  return sessionId
}

// Store analytics event locally
export const storeAnalyticsEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  const analyticsData: AnalyticsData = {
    timestamp: Date.now(),
    eventName,
    properties,
    utmParameters: getUTMParameters(),
    sessionId: getSessionId(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    pageUrl: window.location.href,
  }

  try {
    const existingData = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    const dataArray = existingData ? JSON.parse(existingData) : []
    dataArray.push(analyticsData)
    // Keep only last 1000 events
    if (dataArray.length > 1000) {
      dataArray.shift()
    }
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(dataArray))
  } catch (error) {
    console.error('Error storing analytics data:', error)
  }
}

// Store conversion event
export const storeConversion = (
  type: ConversionData['type'],
  value?: number,
  product?: string
) => {
  if (typeof window === 'undefined') return

  const conversionData: ConversionData = {
    timestamp: Date.now(),
    type,
    source: getUTMParameters().utm_source || 'direct',
    medium: getUTMParameters().utm_medium || 'organic',
    campaign: getUTMParameters().utm_campaign || 'none',
    value,
    product,
  }

  try {
    const existingData = localStorage.getItem(CONVERSIONS_STORAGE_KEY)
    const dataArray = existingData ? JSON.parse(existingData) : []
    dataArray.push(conversionData)
    localStorage.setItem(CONVERSIONS_STORAGE_KEY, JSON.stringify(dataArray))
  } catch (error) {
    console.error('Error storing conversion data:', error)
  }
}

// Store device data
export const storeDeviceData = () => {
  if (typeof window === 'undefined') return

  const deviceData: DeviceData = {
    timestamp: Date.now(),
    deviceType: detectDeviceType(),
    os: detectOS(),
    browser: detectBrowser(),
    screenResolution: getScreenResolution(),
    language: navigator.language || 'Unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  try {
    const existingData = localStorage.getItem(DEVICE_DATA_KEY)
    const dataArray = existingData ? JSON.parse(existingData) : []
    dataArray.push(deviceData)
    // Keep only last 500 device records
    if (dataArray.length > 500) {
      dataArray.shift()
    }
    localStorage.setItem(DEVICE_DATA_KEY, JSON.stringify(dataArray))
  } catch (error) {
    console.error('Error storing device data:', error)
  }
}

// Store behavior data
export const storeBehaviorData = (
  eventType: BehaviorData['eventType'],
  section?: string,
  scrollDepth?: number,
  timeOnPage?: number,
  elementId?: string
) => {
  if (typeof window === 'undefined') return

  const behaviorData: BehaviorData = {
    timestamp: Date.now(),
    eventType,
    section,
    scrollDepth,
    timeOnPage,
    elementId,
  }

  try {
    const existingData = localStorage.getItem(BEHAVIOR_DATA_KEY)
    const dataArray = existingData ? JSON.parse(existingData) : []
    dataArray.push(behaviorData)
    // Keep only last 1000 behavior records
    if (dataArray.length > 1000) {
      dataArray.shift()
    }
    localStorage.setItem(BEHAVIOR_DATA_KEY, JSON.stringify(dataArray))
  } catch (error) {
    console.error('Error storing behavior data:', error)
  }
}

// Analytics tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Store locally for analytics dashboard
  storeAnalyticsEvent(eventName, properties)

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

// Track scroll depth
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  const scrollDepth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0

  // Update max scroll depth for session
  const currentMax = parseInt(localStorage.getItem(SESSION_SCROLL_DEPTH_KEY) || '0')
  if (scrollDepth > currentMax) {
    localStorage.setItem(SESSION_SCROLL_DEPTH_KEY, scrollDepth.toString())
  }

  storeBehaviorData('scroll', undefined, scrollDepth)
}

// Track time on page
export const trackTimeOnPage = (section?: string) => {
  if (typeof window === 'undefined') return

  const startTime = parseInt(localStorage.getItem(SESSION_START_TIME_KEY) || Date.now().toString())
  const timeOnPage = Math.round((Date.now() - startTime) / 1000) // in seconds

  storeBehaviorData('time_on_page', section, undefined, timeOnPage)
}

// Track hover events
export const trackHover = (elementId: string, section?: string) => {
  storeBehaviorData('hover', section, undefined, undefined, elementId)
}

// Track form interactions
export const trackFormInteraction = (formId: string, section?: string) => {
  storeBehaviorData('form_interaction', section, undefined, undefined, formId)
}

// Specific tracking functions
export const trackSocialClick = (platform: string) => {
  trackEvent('click_social', { platform })
  storeConversion('click_social')
}

export const trackGalleryItemClick = (itemId: string, category: string) => {
  trackEvent('click_gallery_item', { item_id: itemId, category })
  storeConversion('click_gallery')
}

export const trackCTAClick = (cta_type: string, location: string) => {
  trackEvent('cta_click', { cta_type, location })
  storeConversion('cta_click')
}

export const trackPurchaseIntent = (product: string, price: number) => {
  trackEvent('purchase_intent', { product, price })
  storeConversion('purchase_intent', price, product)
}

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page })
  storeConversion('page_view')
}

// Get all stored analytics events
export const getStoredAnalyticsEvents = (): AnalyticsData[] => {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error retrieving analytics data:', error)
    return []
  }
}

// Get all stored conversions
export const getStoredConversions = (): ConversionData[] => {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(CONVERSIONS_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error retrieving conversion data:', error)
    return []
  }
}

// Get all stored device data
export const getStoredDeviceData = (): DeviceData[] => {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(DEVICE_DATA_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error retrieving device data:', error)
    return []
  }
}

// Get all stored behavior data
export const getStoredBehaviorData = (): BehaviorData[] => {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(BEHAVIOR_DATA_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error retrieving behavior data:', error)
    return []
  }
}

// Clear analytics data
export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY)
    localStorage.removeItem(CONVERSIONS_STORAGE_KEY)
    localStorage.removeItem(DEVICE_DATA_KEY)
    localStorage.removeItem(BEHAVIOR_DATA_KEY)
  } catch (error) {
    console.error('Error clearing analytics data:', error)
  }
}

// Get analytics summary
export const getAnalyticsSummary = () => {
  const events = getStoredAnalyticsEvents()
  const conversions = getStoredConversions()
  const deviceData = getStoredDeviceData()
  const behaviorData = getStoredBehaviorData()

  const summary = {
    // Basic metrics
    totalEvents: events.length,
    totalConversions: conversions.length,
    uniqueSessions: new Set(events.map(e => e.sessionId)).size,
    eventsByType: {} as Record<string, number>,
    conversionsBySource: {} as Record<string, number>,
    conversionsByType: {} as Record<string, number>,
    totalConversionValue: 0,

    // Device metrics
    devicesByType: {} as Record<string, number>,
    browserStats: {} as Record<string, number>,
    osStats: {} as Record<string, number>,

    // Behavior metrics
    avgScrollDepth: 0,
    avgTimeOnPage: 0,
    bounceRate: 0,

    // Traffic metrics
    conversionRate: 0,
    avgConversionValue: 0,
  }

  // Count events by type
  events.forEach(event => {
    summary.eventsByType[event.eventName] = (summary.eventsByType[event.eventName] || 0) + 1
  })

  // Count conversions by source and type
  conversions.forEach(conversion => {
    summary.conversionsBySource[conversion.source || 'direct'] =
      (summary.conversionsBySource[conversion.source || 'direct'] || 0) + 1
    summary.conversionsByType[conversion.type] =
      (summary.conversionsByType[conversion.type] || 0) + 1
    if (conversion.value) {
      summary.totalConversionValue += conversion.value
    }
  })

  // Device statistics
  deviceData.forEach(device => {
    summary.devicesByType[device.deviceType] = (summary.devicesByType[device.deviceType] || 0) + 1
    summary.browserStats[device.browser] = (summary.browserStats[device.browser] || 0) + 1
    summary.osStats[device.os] = (summary.osStats[device.os] || 0) + 1
  })

  // Behavior statistics
  const scrollDepths = behaviorData
    .filter(b => b.eventType === 'scroll' && b.scrollDepth !== undefined)
    .map(b => b.scrollDepth || 0)
  if (scrollDepths.length > 0) {
    summary.avgScrollDepth = Math.round(scrollDepths.reduce((a, b) => a + b, 0) / scrollDepths.length)
  }

  const timeOnPages = behaviorData
    .filter(b => b.eventType === 'time_on_page' && b.timeOnPage !== undefined)
    .map(b => b.timeOnPage || 0)
  if (timeOnPages.length > 0) {
    summary.avgTimeOnPage = Math.round(timeOnPages.reduce((a, b) => a + b, 0) / timeOnPages.length)
  }

  // Calculate bounce rate (sessions with only page_view)
  const sessionIds = new Set(events.map(e => e.sessionId))
  let bouncedSessions = 0
  sessionIds.forEach(sessionId => {
    const sessionEvents = events.filter(e => e.sessionId === sessionId)
    if (sessionEvents.length === 1 && sessionEvents[0].eventName === 'page_view') {
      bouncedSessions++
    }
  })
  summary.bounceRate = sessionIds.size > 0 ? Math.round((bouncedSessions / sessionIds.size) * 100) : 0

  // Calculate conversion rate
  summary.conversionRate = summary.totalEvents > 0 ? Math.round((summary.totalConversions / summary.totalEvents) * 100) : 0

  // Calculate average conversion value
  summary.avgConversionValue = summary.totalConversions > 0 ? Math.round(summary.totalConversionValue / summary.totalConversions) : 0

  return summary
}
