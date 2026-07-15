import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Moon, Sun, Github, Twitter, Search, Calendar, Clock, User, 
  ArrowLeft, Tag, Share2, Menu, X, Plus, Trash2, Edit2, 
  Send, AlertCircle, CheckCircle, Info, Copy, Check, Upload, Link, Image as ImageIcon,
  Video, FileText, LayoutGrid
} from 'lucide-react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { posts as initialPosts } from './data/posts';

// Configure marked to use highlight.js for rich syntax highlighting and dynamic header IDs
const customRenderer = {
  code(codeOrToken, infostring) {
    let text = '';
    let lang = '';
    if (codeOrToken && typeof codeOrToken === 'object') {
      text = codeOrToken.text || '';
      lang = codeOrToken.lang || '';
    } else {
      text = codeOrToken || '';
      lang = infostring || '';
    }

    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(text, { language: lang }).value;
        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
      } catch (err) {
        // Fallback to auto
      }
    }
    try {
      const highlighted = hljs.highlightAuto(text).value;
      return `<pre><code class="hljs">${highlighted}</code></pre>`;
    } catch (err) {
      // Fallback to plain text
    }
    return `<pre><code>${text}</code></pre>`;
  },
  heading(textOrToken, level, raw, slugger) {
    let text = '';
    let depth = level;
    if (textOrToken && typeof textOrToken === 'object') {
      text = textOrToken.text || '';
      depth = textOrToken.depth || level;
    } else {
      text = textOrToken || '';
      depth = level;
    }

    const cleanText = text.replace(/<[^>]*>/g, '');
    const slug = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[-\s]+/g, '-');

    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  }
};

marked.use({ renderer: customRenderer });

import idTranslations from './locales/id.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

const translations = {
  id: idTranslations,
  en: enTranslations,
  es: esTranslations
};

const toastMessages = {
  id: {
    otpSent: idTranslations.toastOtpSent,
    authSuccess: idTranslations.toastAuthSuccess,
    uploadSuccess: idTranslations.toastUploadSuccess,
    publishSuccess: idTranslations.toastPublishSuccess,
    requiredFields: idTranslations.toastRequiredFields,
    langChanged: idTranslations.toastLangChanged,
    copied: idTranslations.toastCopied,
    disconnected: idTranslations.toastDisconnected
  },
  en: {
    otpSent: enTranslations.toastOtpSent,
    authSuccess: enTranslations.toastAuthSuccess,
    uploadSuccess: enTranslations.toastUploadSuccess,
    publishSuccess: enTranslations.toastPublishSuccess,
    requiredFields: enTranslations.toastRequiredFields,
    langChanged: enTranslations.toastLangChanged,
    copied: enTranslations.toastCopied,
    disconnected: enTranslations.toastDisconnected
  },
  es: {
    otpSent: esTranslations.toastOtpSent,
    authSuccess: esTranslations.toastAuthSuccess,
    uploadSuccess: esTranslations.toastUploadSuccess,
    publishSuccess: esTranslations.toastPublishSuccess,
    requiredFields: esTranslations.toastRequiredFields,
    langChanged: esTranslations.toastLangChanged,
    copied: esTranslations.toastCopied,
    disconnected: esTranslations.toastDisconnected
  }
};

const isAiStudioEnv = typeof window !== 'undefined' && (
  window.location.hostname.includes('asia-east1.run.app') || 
  window.location.hostname.includes('localhost') || 
  window.location.hostname.includes('127.0.0.1') || 
  window.location.search.includes('studio=true')
);

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/es')) return 'es';
    return 'id';
  });
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    if (toasts.some((t) => t.message === message)) {
      return;
    }
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      if (prev.some((t) => t.message === message)) {
        return prev;
      }
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const getReadingTime = (post) => {
    if (!post) return '';
    if (!post.content) {
      if (post.readingTime) {
        const num = parseInt(post.readingTime);
        if (!isNaN(num)) {
          return `${num} ${translations[lang].readTimeSuffix}`;
        }
      }
      return `1 ${translations[lang].readTimeSuffix}`;
    }
    const words = post.content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} ${translations[lang].readTimeSuffix}`;
  };

  const getMediaType = (item) => {
    if (!item) return 'document';
    if (item.type) return item.type;
    const name = (item.fileName || '').toLowerCase();
    if (name.match(/\.(png|jpe?g|gif|webp|svg|bmp)$/i)) return 'image';
    if (name.match(/\.(mp4|mov|avi|mkv|webm|flv|3gp|wmv)$/i)) return 'video';
    return 'document';
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    if (newLang === 'en') {
      window.history.pushState({}, '', '/en');
    } else if (newLang === 'es') {
      window.history.pushState({}, '', '/es');
    } else {
      window.history.pushState({}, '', '/');
    }
    addToast(toastMessages[newLang].langChanged, 'info');
  };
  // views: 'home' | 'blog' | 'archive' | 'search' | 'tags' | 'post' | 'studio'
  const [view, setView] = useState('home');
  const [activePostId, setActivePostId] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [showTopLink, setShowTopLink] = useState(false);

  // Custom posts state (merged with preloaded posts)
  const [posts, setPosts] = useState(() => {
    const local = localStorage.getItem('papermod_custom_posts');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return [...initialPosts, ...parsed];
      } catch (e) {
        return initialPosts;
      }
    }
    return initialPosts;
  });

  // Derived state to get fully localized text for posts
  const localizedPosts = useMemo(() => {
    return posts.map(post => {
      const getField = (fieldVal) => {
        if (!fieldVal) return '';
        if (typeof fieldVal === 'object') {
          return fieldVal[lang] || fieldVal['id'] || fieldVal['en'] || '';
        }
        return fieldVal;
      };
      return {
        ...post,
        title: getField(post.title),
        description: getField(post.description),
        formattedDate: getField(post.formattedDate),
        content: getField(post.content)
      };
    });
  }, [posts, lang]);

  // Telegram MTProto client credentials state
  const [telegramConfig, setTelegramConfig] = useState(() => {
    const saved = localStorage.getItem('tg_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { apiId: '', apiHash: '', phone: '', channel: '', sessionString: '' };
      }
    }
    return { apiId: '', apiHash: '', phone: '', channel: '', sessionString: '' };
  });

  // Telegram status and flow state
  const [tgStep, setTgStep] = useState('config'); // 'config' | 'otp' | 'connected'
  const [otpCode, setOtpCode] = useState('');
  const [tgPassword, setTgPassword] = useState('');
  const [tgStatus, setTgStatus] = useState('');
  const [tgError, setTgError] = useState('');
  const [isTgTesting, setIsTgTesting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Media uploader inputs
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadedHistory, setUploadedHistory] = useState(() => {
    const saved = localStorage.getItem('uploaded_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [copiedUrlIndex, setCopiedUrlIndex] = useState(null);
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [postCopiedRaw, setPostCopiedRaw] = useState(false);
  const [postCopiedLink, setPostCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tgSearchQuery, setTgSearchQuery] = useState('');
  const [tgFilterType, setTgFilterType] = useState('all'); // 'all' | 'image' | 'video' | 'document'

  // Author Profile State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('pexmod_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'PexihDev',
          avatar: parsed.avatar || '/images/screenshot.png',
          bioId: parsed.bioId || idTranslations.homeSubtitle,
          bioEn: parsed.bioEn || enTranslations.homeSubtitle,
          bioEs: parsed.bioEs || esTranslations.homeSubtitle,
          github: parsed.github ?? 'https://github.com/adityatelange/hugo-PaperMod',
          twitter: parsed.twitter ?? 'https://twitter.com/',
          telegram: parsed.telegram ?? 'https://t.me/',
          website: parsed.website ?? ''
        };
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: 'PexihDev',
      avatar: '/images/screenshot.png',
      bioId: idTranslations.homeSubtitle,
      bioEn: enTranslations.homeSubtitle,
      bioEs: esTranslations.homeSubtitle,
      github: 'https://github.com/adityatelange/hugo-PaperMod',
      twitter: 'https://twitter.com/',
      telegram: 'https://t.me/',
      website: ''
    };
  });

  const [profileEditData, setProfileEditData] = useState({ ...profile });

  // Update profile edit data when profile changes
  useEffect(() => {
    setProfileEditData({ ...profile });
  }, [profile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('pexmod_profile', JSON.stringify(profileEditData));
    setProfile(profileEditData);
    addToast(translations[lang].profileSaved || 'Profile saved!', 'success');
  };

  // Markdown Blog Creator State
  const [newPost, setNewPost] = useState(() => {
    const saved = localStorage.getItem('studio_draft_post');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      title: '',
      description: '',
      author: 'PexihDev',
      tags: '',
      content: ''
    };
  });
  const [postSuccess, setPostSuccess] = useState('');
  const [draftStatus, setDraftStatus] = useState(''); // '', 'saving', 'saved'
  const [studioViewMode, setStudioViewMode] = useState(() => localStorage.getItem('studio_view_mode') || 'split');

  // Auto-save draft to localStorage
  useEffect(() => {
    const hasContent = newPost.title || newPost.tags || newPost.content || newPost.description;
    if (!hasContent) {
      setDraftStatus('');
      return;
    }

    setDraftStatus('saving');
    const timer = setTimeout(() => {
      localStorage.setItem('studio_draft_post', JSON.stringify(newPost));
      setDraftStatus('saved');
    }, 1500);

    return () => clearTimeout(timer);
  }, [newPost]);

  const handleImportMdFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      
      let title = '';
      let description = '';
      let author = profile.name || 'PexihDev';
      let tags = '';
      let content = text;

      // Check for front matter
      const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
      const match = text.match(frontMatterRegex);

      if (match) {
        const yamlContent = match[1];
        content = text.replace(frontMatterRegex, '');

        const lines = yamlContent.split(/\r?\n/);
        lines.forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim().toLowerCase();
            let value = line.slice(colonIndex + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
              value = value.slice(1, -1).split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '')).join(', ');
            }

            if (key === 'title') title = value;
            else if (key === 'description' || key === 'desc') description = value;
            else if (key === 'author') author = value;
            else if (key === 'tags') tags = value;
          }
        });
      } else {
        const headingMatch = text.match(/^#\s+(.*)/m);
        if (headingMatch) {
          title = headingMatch[1].trim();
          content = text.replace(/^#\s+.*\r?\n?/m, '').trim();
        }
      }

      setNewPost({
        title: title || file.name.replace(/\.mdx?$/i, '').replace(/[-_]/g, ' '),
        description,
        author: author || profile.name,
        tags,
        content
      });

      addToast(translations[lang].importSuccess || 'File imported successfully!', 'success');
    };

    reader.onerror = () => {
      addToast(translations[lang].importError || 'Failed to read file.', 'error');
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  // Prevent non-AI Studio environment from entering studio view
  useEffect(() => {
    if (view === 'studio' && !isAiStudioEnv) {
      setView('home');
    }
  }, [view]);

  // Synchronize Theme
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      document.body.className = 'dark list';
    } else {
      root.setAttribute('data-theme', 'light');
      document.body.className = 'list';
    }
  }, [theme]);

  // Synchronize Language
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Handle popstate for back/forward routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        setLang('en');
      } else if (path.startsWith('/es')) {
        setLang('es');
      } else {
        setLang('id');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse shareable link on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postParam = params.get('post') || params.get('p');
    if (postParam) {
      const found = posts.find(p => p.id === postParam || p.slug === postParam);
      if (found) {
        setActivePostId(found.id);
        setView('post');
      }
    } else {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#post-')) {
        const postId = hash.replace('#post-', '');
        const found = posts.find(p => p.id === postId || p.slug === postId);
        if (found) {
          setActivePostId(found.id);
          setView('post');
        }
      }
    }
  }, [posts]);

  // Handle Scroll to toggle Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopLink(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track scroll progress for reading view
  useEffect(() => {
    if (view !== 'post') {
      setScrollProgress(0);
      return;
    }

    const handleReadingScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleReadingScroll, { passive: true });
    // Initialize immediately
    handleReadingScroll();

    return () => window.removeEventListener('scroll', handleReadingScroll);
  }, [view, activePostId]);

  // Scroll to top on navigation changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view, activePostId, activeTag]);

  // Verify Telegram Session on mount if exists
  useEffect(() => {
    if (telegramConfig.sessionString && telegramConfig.apiId && telegramConfig.apiHash) {
      testTelegramSession(telegramConfig.sessionString);
    }
  }, []);

  const testTelegramSession = async (sessionStr) => {
    setIsTgTesting(true);
    try {
      const response = await fetch('/api/telegram/test-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionString: sessionStr,
          apiId: telegramConfig.apiId,
          apiHash: telegramConfig.apiHash
        }),
      });
      const data = await response.json();
      if (data.success && data.authorized) {
        setTgStep('connected');
        setTgStatus('Session Connected & Authorized!');
      } else {
        setTgStep('config');
        setTgError('Previous session expired. Please reconnect.');
      }
    } catch (e) {
      setTgStep('config');
    } finally {
      setIsTgTesting(false);
    }
  };

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (postId) => {
    setActivePostId(postId);
    setView('post');
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setView('blog');
  };

  // Get all unique tags and counts
  const getTagsWithCounts = () => {
    const counts = {};
    localizedPosts.forEach(p => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach(t => {
          counts[t] = (counts[t] || 0) + 1;
        });
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  // Filter posts based on activeTag
  const getFilteredPosts = () => {
    if (!activeTag) return localizedPosts;
    return localizedPosts.filter(p => p.tags && p.tags.includes(activeTag));
  };

  // Highlight search keywords in text with a soft faded background
  const highlightText = (text, query) => {
    if (!text) return '';
    if (!query || !query.trim()) return text;
    
    const words = query
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      
    if (words.length === 0) return text;
    
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      const isMatch = words.some(word => new RegExp(`^${word}$`, 'i').test(part));
      return isMatch ? (
        <mark
          key={i}
          style={{
            background: 'rgba(234, 179, 8, 0.22)',
            color: 'inherit',
            borderRadius: '2px',
            padding: '1px 3px',
            margin: '0 -1px',
            fontWeight: '500'
          }}
          id={`search-highlight-${i}`}
        >
          {part}
        </mark>
      ) : (
        part
      );
    });
  };

  // Search filter
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return localizedPosts.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
    );
  };

  // Group posts for archive (grouped by Year, then Month)
  const getArchiveData = () => {
    const groups = {};
    localizedPosts.forEach(post => {
      const dateObj = new Date(post.date);
      const year = isNaN(dateObj.getTime()) ? 2026 : dateObj.getFullYear();
      const month = isNaN(dateObj.getTime()) ? 'July' : dateObj.toLocaleString('default', { month: 'long' });
      
      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][month]) {
        groups[year][month] = [];
      }
      groups[year][month].push(post);
    });
    return groups;
  };

  // Find post by ID
  const currentPost = localizedPosts.find(p => p.id === activePostId) || localizedPosts[0];

  // Next and Previous posts
  const currentIndex = localizedPosts.findIndex(p => p.id === currentPost?.id);
  const prevPost = currentIndex > 0 ? localizedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < localizedPosts.length - 1 ? localizedPosts[currentIndex + 1] : null;

  // Initialize marked parser for markdown parsing
  const renderMarkdown = (text) => {
    try {
      return { __html: marked.parse(text || '') };
    } catch (err) {
      return { __html: text || '' };
    }
  };

  // Extract h2 and h3 headings from Markdown text
  const getHeadings = (content) => {
    if (!content) return [];
    const lines = content.split('\n');
    const headings = [];
    
    lines.forEach((line) => {
      // Match h2 and h3 headings: "## My Heading" or "### My Heading"
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length; // 2 or 3
        let text = match[2].trim();
        if (text.endsWith('#')) {
          text = text.replace(/#+$/, '').trim();
        }
        
        // Strip markdown formatting symbols
        const cleanText = text
          .replace(/[*_`]/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
          
        const slug = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/[-\s]+/g, '-');
          
        headings.push({
          level,
          text: cleanText,
          slug
        });
      }
    });
    
    return headings;
  };

  // MTProto Telegram Connection flow
  const handleTgRequestCode = async (e) => {
    e.preventDefault();
    setTgStatus('Sending verification code via MTProto...');
    setTgError('');
    try {
      const response = await fetch('/api/telegram/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiId: telegramConfig.apiId,
          apiHash: telegramConfig.apiHash,
          phone: telegramConfig.phone
        })
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to send OTP code.');
      }
      setTgStep('otp');
      setTgStatus('OTP Sent! Please check your Telegram account/SMS.');
      addToast(toastMessages[lang].otpSent, 'success');
    } catch (err) {
      setTgError(err.message);
      setTgStatus('');
      addToast(err.message, 'error');
    }
  };

  const handleTgSignIn = async (e) => {
    e.preventDefault();
    setTgStatus('Verifying security parameters...');
    setTgError('');
    try {
      const response = await fetch('/api/telegram/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: telegramConfig.phone,
          code: otpCode,
          password: tgPassword
        })
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Invalid code or password.');
      }

      const updatedConfig = {
        ...telegramConfig,
        sessionString: data.sessionString
      };
      setTelegramConfig(updatedConfig);
      localStorage.setItem('tg_config', JSON.stringify(updatedConfig));
      setTgStep('connected');
      setTgStatus('Authentication fully successful! Connection established.');
      addToast(toastMessages[lang].authSuccess, 'success');
    } catch (err) {
      setTgError(err.message);
      setTgStatus('');
      addToast(err.message, 'error');
    }
  };

  const handleTgDisconnect = () => {
    const updated = { ...telegramConfig, sessionString: '' };
    setTelegramConfig(updated);
    localStorage.setItem('tg_config', JSON.stringify(updated));
    setTgStep('config');
    setTgStatus('Disconnected.');
    setTgError('');
    addToast(toastMessages[lang].disconnected, 'info');
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTgUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage || !telegramConfig.sessionString) return;

    setIsUploading(true);
    setTgStatus('Uploading media file via secure MTProto client...');
    setTgError('');
    try {
      const response = await fetch('/api/telegram/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionString: telegramConfig.sessionString,
          apiId: telegramConfig.apiId,
          apiHash: telegramConfig.apiHash,
          channel: telegramConfig.channel,
          fileBase64: imagePreview,
          fileName: selectedImage.name,
          caption: imageCaption
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Upload execution failed.');
      }

      setUploadedUrl(data.directLink);
      setTgStatus('Media file successfully saved on Telegram channel!');
      
      const fileType = selectedImage.type.startsWith('image/') 
        ? 'image' 
        : selectedImage.type.startsWith('video/') 
          ? 'video' 
          : 'document';

      const newHistoryItem = {
        id: Date.now(),
        fileName: selectedImage.name,
        link: data.directLink,
        date: new Date().toLocaleString(),
        caption: imageCaption,
        type: fileType
      };

      const updatedHistory = [newHistoryItem, ...uploadedHistory];
      setUploadedHistory(updatedHistory);
      localStorage.setItem('uploaded_history', JSON.stringify(updatedHistory));
      addToast(toastMessages[lang].uploadSuccess, 'success');

      // Reset file input
      setSelectedImage(null);
      setImagePreview('');
      setImageCaption('');
    } catch (err) {
      setTgError(err.message);
      setTgStatus('');
      addToast(err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Copy helper
  const copyToClipboard = (text, idOrIndex) => {
    navigator.clipboard.writeText(text);
    setCopiedUrlIndex(idOrIndex);
    addToast(toastMessages[lang].copied, 'success');
    setTimeout(() => setCopiedUrlIndex(null), 2000);
  };

  const handleCopyShareableLink = (postId, e) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?post=${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedPostId(postId);
      addToast(translations[lang].copiedLink, 'success');
      setTimeout(() => setCopiedPostId(null), 2000);
    }).catch(() => {
      addToast(lang === 'id' ? 'Gagal menyalin tautan.' : lang === 'es' ? 'Error al copiar el enlace.' : 'Failed to copy link.', 'error');
    });
  };

  // Save new post to local state
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      addToast(toastMessages[lang].requiredFields, 'error');
      return;
    }

    const cleanedTags = newPost.tags
      ? newPost.tags.split(',').map(t => t.trim()).filter(Boolean)
      : ['General'];

    const dateToday = new Date().toISOString().split('T')[0];
    const dateFormatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const words = newPost.content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} min`;

    const customPost = {
      id: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: newPost.title,
      description: newPost.description || newPost.content.slice(0, 100) + '...',
      date: dateToday,
      formattedDate: dateFormatted,
      readingTime,
      author: newPost.author || profile.name || 'Author',
      tags: cleanedTags,
      content: newPost.content
    };

    // Store custom posts to localStorage
    const local = localStorage.getItem('papermod_custom_posts');
    let customList = [];
    if (local) {
      try {
        customList = JSON.parse(local);
      } catch (e) {
        customList = [];
      }
    }
    customList.push(customPost);
    localStorage.setItem('papermod_custom_posts', JSON.stringify(customList));

    // Update state to render immediately
    setPosts([...initialPosts, ...customList]);

    setNewPost({
      title: '',
      description: '',
      author: profile.name,
      tags: '',
      content: ''
    });

    localStorage.removeItem('studio_draft_post');
    setDraftStatus('');

    addToast(toastMessages[lang].publishSuccess, 'success');
    setView('blog');
  };

  return (
    <>
      {view === 'post' && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${scrollProgress}%`,
            height: '2px',
            background: 'var(--primary)',
            zIndex: 9999,
            transition: 'width 0.1s ease-out'
          }}
          id="reading-progress-bar"
        />
      )}
      <header className="header" style={{borderBottom: '1px solid var(--border)'}}>
        <nav className="header-nav" style={{maxWidth: 'var(--nav-width)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'var(--header-height)'}}>
          <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); setView('home'); setActiveTag(''); }} 
              accessKey="h" 
              title="PexMod Web Home (Alt + H)"
              style={{fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: 'var(--primary)', letterSpacing: '-0.5px'}}
            >
              PexMod
            </a>
            <span style={{fontSize: '11px', background: 'var(--code-bg)', color: 'var(--secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
              Web Hub
            </span>
          </div>
          
          <ul className="menu" style={{display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap'}}>
            <li>
              <a 
                href="#blog" 
                className={view === 'blog' && !activeTag ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setView('blog'); setActiveTag(''); }}
                style={{color: view === 'blog' ? 'var(--primary)' : 'var(--secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px'}}
              >
                {translations[lang].navBlog}
              </a>
            </li>
            <li>
              <a 
                href="#archives" 
                className={view === 'archive' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setView('archive'); }}
                style={{color: view === 'archive' ? 'var(--primary)' : 'var(--secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px'}}
              >
                {translations[lang].navArchive}
              </a>
            </li>
            <li>
              <a 
                href="#search" 
                className={view === 'search' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setView('search'); }}
                style={{color: view === 'search' ? 'var(--primary)' : 'var(--secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px'}}
                title="Search (Alt + /)"
              >
                <Search size={14} aria-hidden="true" />
                <span>{translations[lang].navSearch}</span>
              </a>
            </li>
            <li>
              <a 
                href="#tags" 
                className={view === 'tags' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setView('tags'); }}
                style={{color: view === 'tags' ? 'var(--primary)' : 'var(--secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px'}}
              >
                {translations[lang].navTags}
              </a>
            </li>
            {isAiStudioEnv && (
              <li>
                <a 
                  href="#studio" 
                  className={view === 'studio' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setView('studio'); }}
                  style={{
                    background: view === 'studio' ? 'var(--primary)' : 'var(--code-bg)', 
                    color: view === 'studio' ? 'var(--theme)' : 'var(--primary)', 
                    padding: '6px 14px', 
                    borderRadius: '16px', 
                    textDecoration: 'none', 
                    fontWeight: '600', 
                    fontSize: '14px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={14} aria-hidden="true" /> {translations[lang].navStudio}
                </a>
              </li>
            )}
            <li>
              <div className="language-switcher" style={{display: 'flex', alignItems: 'center', gap: '4px', borderRight: '1px solid var(--border)', paddingRight: '12px', marginRight: '4px'}}>
                {['id', 'en', 'es'].map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLanguage(l)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '2px 6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontWeight: lang === l ? '700' : '400',
                      color: lang === l ? 'var(--primary)' : 'var(--secondary)',
                      background: lang === l ? 'var(--code-bg)' : 'transparent',
                      textTransform: 'uppercase',
                      transition: 'all 0.1s ease-in-out'
                    }}
                    aria-label={`Switch to ${l === 'id' ? 'Indonesian' : l === 'en' ? 'English' : 'Spanish'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </li>
            <li>
              <button 
                id="theme-toggle" 
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme mode"
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
              >
                {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main" id="main-content-area" style={{maxWidth: 'var(--main-width)', margin: '0 auto', padding: '40px var(--gap)', minHeight: 'calc(100vh - var(--header-height) - var(--footer-height) - 100px)'}}>
        
        {/* VIEW 1: HOME PAGE */}
        {view === 'home' && (
          <motion.div 
            id="home-view-container"
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section className="profile" id="home-profile-card">
              <div className="profile_inner" style={{textAlign: 'center', padding: '40px 0'}}>
                <img 
                  draggable="false" 
                  src={profile.avatar} 
                  alt={`${profile.name} Avatar`} 
                  title={profile.name}
                  height="150" 
                  width="150" 
                  style={{objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--border)', margin: '0 auto 20px', display: 'block'}}
                  id="profile-avatar-img"
                />
                <h1 id="profile-heading" style={{fontSize: '40px', fontWeight: '700', margin: '10px 0 15px', letterSpacing: '-0.5px'}}>{profile.name}</h1>
                <p id="profile-subtitle" style={{fontSize: '18px', color: 'var(--secondary)', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 24px'}}>
                  {lang === 'id' ? profile.bioId : lang === 'es' ? profile.bioEs : profile.bioEn}
                </p>
                
                <div className="social-icons" id="profile-socials" style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '0 auto 24px'}}>
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Official Github link" style={{color: 'var(--primary)', transition: 'transform 0.15s ease'}} className="hover-scale">
                      <Github size={22} aria-hidden="true" />
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter link" style={{color: 'var(--primary)', transition: 'transform 0.15s ease'}} className="hover-scale">
                      <Twitter size={22} aria-hidden="true" />
                    </a>
                  )}
                  {profile.telegram && (
                    <a href={profile.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram link" style={{color: 'var(--primary)', transition: 'transform 0.15s ease'}} className="hover-scale">
                      <Send size={22} aria-hidden="true" />
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" aria-label="Website link" style={{color: 'var(--primary)', transition: 'transform 0.15s ease'}} className="hover-scale">
                      <Link size={22} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="buttons" style={{marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '12px'}} id="profile-cta-buttons">
                  <a 
                    href="#blog" 
                    className="button" 
                    onClick={(e) => { e.preventDefault(); setView('blog'); }}
                    style={{fontWeight: '600', padding: '12px 24px', background: 'var(--primary)', color: 'var(--theme)', borderRadius: '30px', textDecoration: 'none', fontSize: '15px'}}
                    id="cta-read-blog"
                  >
                    {translations[lang].ctaReadBlog}
                  </a>
                  {isAiStudioEnv && (
                    <a 
                      href="#studio" 
                      className="button" 
                      onClick={(e) => { e.preventDefault(); setView('studio'); }}
                      style={{fontWeight: '600', padding: '12px 24px', background: 'var(--code-bg)', color: 'var(--primary)', borderRadius: '30px', textDecoration: 'none', border: '1px solid var(--border)', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '6px'}}
                      id="cta-studio"
                    >
                      <Plus size={16} aria-hidden="true" /> {translations[lang].ctaWriteUpload}
                    </a>
                  )}
                </div>
              </div>
            </section>

            <hr style={{border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0'}} />

            <section className="recent-posts-section" id="recent-articles-section">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h2 style={{fontSize: '22px', fontWeight: '700', margin: 0, color: 'var(--primary)'}}>{translations[lang].recentArticles}</h2>
                <a 
                  href="#blog" 
                  onClick={(e) => { e.preventDefault(); setView('blog'); }}
                  style={{fontSize: '14px', color: 'var(--secondary)', textDecoration: 'underline', fontWeight: '500'}}
                  id="view-all-posts-link"
                >
                  {translations[lang].viewAll}
                </a>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '18px'}} id="recent-posts-list">
                {localizedPosts.slice().reverse().slice(0, 3).map(post => (
                  <article className="post-entry" key={post.id} style={{position: 'relative', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', background: 'var(--entry)', transition: 'transform 0.2s, box-shadow 0.2s'}} id={`recent-post-card-${post.id}`}>
                    <div style={{position: 'absolute', top: '20px', right: '20px', zIndex: 10}} id={`recent-post-copy-container-${post.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleCopyShareableLink(post.id, e)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--code-bg)',
                          border: `1px solid ${copiedPostId === post.id ? '#10b981' : 'var(--border)'}`,
                          color: copiedPostId === post.id ? '#10b981' : 'var(--secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        title={copiedPostId === post.id ? translations[lang].copiedLink : translations[lang].copyLink}
                        aria-label={copiedPostId === post.id ? translations[lang].copiedLink : translations[lang].copyLink}
                        id={`recent-post-copy-btn-${post.id}`}
                      >
                        {copiedPostId === post.id ? (
                          <Check size={14} style={{strokeWidth: 2.5}} />
                        ) : (
                          <Link size={14} />
                        )}
                      </motion.button>
                    </div>
                    <header className="entry-header">
                      <h3 style={{fontSize: '20px', fontWeight: '600', margin: '0 0 10px', color: 'var(--primary)'}}>{post.title}</h3>
                    </header>
                    <div className="entry-content">
                      <p style={{fontSize: '15px', color: 'var(--secondary)', margin: '0 0 15px', lineHeight: '1.6'}}>{post.description}</p>
                    </div>
                    <footer className="entry-footer" style={{display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)'}}>
                      <Calendar size={12} aria-hidden="true" />
                      <span>{post.formattedDate}</span>
                      <span>&middot;</span>
                      <Clock size={12} aria-hidden="true" />
                      <span>{getReadingTime(post)}</span>
                      <span>&middot;</span>
                      <User size={12} aria-hidden="true" />
                      <span>{post.author}</span>
                    </footer>
                    <a 
                      className="entry-link" 
                      aria-label={`Read article: ${post.title}`} 
                      href={`#post-${post.id}`}
                      onClick={(e) => { e.preventDefault(); handlePostClick(post.id); }}
                      style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, cursor: 'pointer'}}
                      id={`recent-post-action-${post.id}`}
                    ></a>
                  </article>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* VIEW 2: BLOG POSTS FEED */}
        {view === 'blog' && (
          <motion.div 
            id="blog-feed-container"
            key={`blog-${activeTag || 'all'}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="page-header" id="blog-feed-header" style={{marginBottom: '32px'}}>
              <h1 style={{fontSize: '32px', fontWeight: '700', margin: '0 0 8px'}}>
                {activeTag ? `${translations[lang].showingTag}: #${activeTag}` : 'Blog Articles'}
              </h1>
              {activeTag && (
                <button 
                  onClick={() => setActiveTag('')}
                  style={{
                    fontSize: '14px',
                    color: 'var(--secondary)',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0
                  }}
                  id="clear-tag-filter-btn"
                >
                  <ArrowLeft size={14} aria-hidden="true" /> {translations[lang].clearFilter}
                </button>
              )}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}} id="blog-posts-list">
              {getFilteredPosts().length === 0 ? (
                <p style={{color: 'var(--secondary)'}}>{translations[lang].noArticles}</p>
              ) : (
                getFilteredPosts().slice().reverse().map(post => (
                  <article className="post-entry" key={post.id} style={{position: 'relative', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', background: 'var(--entry)'}} id={`blog-post-card-${post.id}`}>
                    <div style={{position: 'absolute', top: '24px', right: '24px', zIndex: 10}} id={`blog-post-copy-container-${post.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleCopyShareableLink(post.id, e)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--code-bg)',
                          border: `1px solid ${copiedPostId === post.id ? '#10b981' : 'var(--border)'}`,
                          color: copiedPostId === post.id ? '#10b981' : 'var(--secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        title={copiedPostId === post.id ? translations[lang].copiedLink : translations[lang].copyLink}
                        aria-label={copiedPostId === post.id ? translations[lang].copiedLink : translations[lang].copyLink}
                        id={`blog-post-copy-btn-${post.id}`}
                      >
                        {copiedPostId === post.id ? (
                          <Check size={14} style={{strokeWidth: 2.5}} />
                        ) : (
                          <Link size={14} />
                        )}
                      </motion.button>
                    </div>
                    <header className="entry-header">
                      <h2 style={{fontSize: '22px', fontWeight: '600', margin: '0 0 10px', color: 'var(--primary)'}}>{post.title}</h2>
                    </header>
                    <div className="entry-content">
                      <p style={{fontSize: '15px', color: 'var(--secondary)', margin: '0 0 15px', lineHeight: '1.6'}}>{post.description}</p>
                    </div>
                    <footer className="entry-footer" style={{display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)'}}>
                      <Calendar size={12} aria-hidden="true" />
                      <span>{post.formattedDate}</span>
                      <span>&middot;</span>
                      <Clock size={12} aria-hidden="true" />
                      <span>{getReadingTime(post)}</span>
                      <span>&middot;</span>
                      <User size={12} aria-hidden="true" />
                      <span>{post.author}</span>
                    </footer>
                    <a 
                      className="entry-link" 
                      aria-label={`Read article: ${post.title}`} 
                      href={`#post-${post.id}`}
                      onClick={(e) => { e.preventDefault(); handlePostClick(post.id); }}
                      style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, cursor: 'pointer'}}
                      id={`blog-post-action-${post.id}`}
                    ></a>
                  </article>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW 3: SINGLE POST READING VIEW */}
        {view === 'post' && currentPost && (
          <article 
            className="post-single" 
            id="single-post-view-container"
            key={`post-${currentPost.id}`}
          >
            <header className="post-header" id="single-post-header" style={{marginBottom: '30px'}}>
              <div className="breadcrumbs" id="single-post-breadcrumbs" style={{fontSize: '13px', color: 'var(--secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <a href="/" onClick={(e) => { e.preventDefault(); setView('home'); }} style={{color: 'var(--secondary)', textDecoration: 'none'}}>
                  {translations[lang].breadcrumbsHome}
                </a>
                <span>&raquo;</span>
                <a href="#blog" onClick={(e) => { e.preventDefault(); setView('blog'); setActiveTag(''); }} style={{color: 'var(--secondary)', textDecoration: 'none'}}>
                  {translations[lang].navBlog}
                </a>
                <span>&raquo;</span>
                <span style={{color: 'var(--primary)'}}>{currentPost.title}</span>
              </div>
              <h1 className="post-title" style={{fontSize: '36px', fontWeight: '700', color: 'var(--primary)', margin: '0 0 10px', letterSpacing: '-0.5px'}} id="single-post-title">{currentPost.title}</h1>
              <div className="post-description" style={{color: 'var(--secondary)', fontSize: '17px', fontStyle: 'italic', marginBottom: '15px', lineHeight: '1.5'}} id="single-post-desc">
                {currentPost.description}
              </div>
              <div className="post-meta" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)', borderBottom: '1px solid var(--border)', paddingBottom: '15px'}} id="single-post-meta">
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px'}}>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><Calendar size={13} aria-hidden="true" /> {currentPost.formattedDate}</span>
                  <span>&middot;</span>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><Clock size={13} aria-hidden="true" /> {getReadingTime(currentPost)}</span>
                  <span>&middot;</span>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><User size={13} aria-hidden="true" /> {currentPost.author}</span>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}} className="post-copy-group">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentPost.content).then(() => {
                        setPostCopiedRaw(true);
                        addToast(
                          lang === 'id' ? 'Salinan naskah berhasil disalin ke clipboard.' :
                          lang === 'es' ? 'Texto copiado al portapapeles.' :
                          'Raw content copied to clipboard.', 
                          'success'
                        );
                        setTimeout(() => setPostCopiedRaw(false), 2000);
                      });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      background: 'var(--code-bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      color: 'var(--secondary)',
                      fontFamily: 'var(--font-mono, monospace)',
                      transition: 'all 0.15s ease'
                    }}
                    title={
                      lang === 'id' ? 'Salin isi tulisan mentah (Markdown)' :
                      lang === 'es' ? 'Copiar texto sin formato (Markdown)' :
                      'Copy raw markdown text'
                    }
                    className="copy-raw-btn"
                  >
                    {postCopiedRaw ? <Check size={11} style={{color: '#10b981'}} /> : <FileText size={11} />}
                    <span>{postCopiedRaw ? (lang === 'id' ? 'Tersalin' : lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'id' ? 'Salin Naskah' : lang === 'es' ? 'Copiar Texto' : 'Copy Raw')}</span>
                  </button>

                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}${window.location.pathname}?post=${currentPost.id}`;
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        setPostCopiedLink(true);
                        addToast(translations[lang].copiedLink, 'success');
                        setTimeout(() => setPostCopiedLink(false), 2000);
                      });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      background: 'var(--code-bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      color: 'var(--secondary)',
                      fontFamily: 'var(--font-mono, monospace)',
                      transition: 'all 0.15s ease'
                    }}
                    title={
                      lang === 'id' ? 'Salin tautan langsung' :
                      lang === 'es' ? 'Copiar enlace directo' :
                      'Copy direct link'
                    }
                    className="copy-link-btn"
                  >
                    {postCopiedLink ? <Check size={11} style={{color: '#10b981'}} /> : <Link size={11} />}
                    <span>{postCopiedLink ? (lang === 'id' ? 'Tersalin' : lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'id' ? 'Salin Tautan' : lang === 'es' ? 'Copiar Enlace' : 'Copy Link')}</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Table Of Contents */}
            {(() => {
              const headings = getHeadings(currentPost.content);
              if (headings.length === 0) return null;
              
              return (
                <details 
                  className="toc" 
                  open={headings.length <= 10} 
                  style={{
                    background: 'var(--code-bg)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    marginBottom: '32px'
                  }} 
                  id="single-post-toc"
                >
                  <summary style={{
                    fontWeight: '600', 
                    cursor: 'pointer', 
                    outline: 'none', 
                    userSelect: 'none', 
                    fontSize: '15px', 
                    color: 'var(--primary)'
                  }}>
                    <span>{translations[lang].tableOfContents}</span>
                  </summary>
                  <div className="inner" style={{marginTop: '12px', borderLeft: '1px solid var(--border)', marginLeft: '4px', paddingLeft: '12px'}}>
                    <ul style={{listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
                      {headings.map((heading, idx) => (
                        <li 
                          key={idx} 
                          style={{
                            paddingLeft: heading.level === 3 ? '16px' : '0px'
                          }}
                        >
                          <a 
                            href={`#${heading.slug}`} 
                            style={{
                              color: 'var(--secondary)', 
                              textDecoration: 'none',
                              fontSize: heading.level === 3 ? '13px' : '14px',
                              transition: 'color 0.15s ease',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }} 
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--secondary)'}
                            onClick={(e) => { 
                              e.preventDefault(); 
                              document.getElementById(heading.slug)?.scrollIntoView({behavior: 'smooth'}); 
                            }}
                          >
                            <span style={{
                              color: 'var(--border)', 
                              fontFamily: 'var(--font-mono, monospace)', 
                              fontSize: '11px',
                              userSelect: 'none'
                            }}>
                              {heading.level === 3 ? '↳' : '•'}
                            </span>
                            <span>{heading.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })()}

            {/* Post Content parsed from Markdown */}
            <div 
              className="post-content md-content" 
              dangerouslySetInnerHTML={renderMarkdown(currentPost.content)}
              style={{fontSize: '16px', lineHeight: '1.8', color: 'var(--content)'}}
              id="single-post-content-body"
            />

            <footer className="post-footer" id="single-post-footer" style={{marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)'}}>
              {currentPost.tags && currentPost.tags.length > 0 && (
                <div style={{marginBottom: '24px'}}>
                  <h4 style={{fontSize: '13px', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px', fontWeight: '600'}}>
                    {translations[lang].postTags}
                  </h4>
                  <ul className="post-tags" style={{display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0}} id="single-post-tags-list">
                    {currentPost.tags.map(tag => (
                      <li key={tag}>
                        <a 
                          href={`#tag-${tag}`} 
                          onClick={(e) => { e.preventDefault(); handleTagClick(tag); }} 
                          style={{
                            fontSize: '13px',
                            background: 'var(--code-bg)',
                            color: 'var(--primary)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            border: '1px solid var(--border)'
                          }}
                          id={`post-tag-btn-${tag}`}
                        >
                          #{tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share Buttons */}
              <div className="share-buttons" style={{margin: '24px 0', padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'}} id="single-post-share-section">
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
                  <span style={{fontSize: '14px', color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '500'}}>
                    <Share2 size={14} aria-hidden="true" /> {translations[lang].shareArticle}:
                  </span>
                  <div style={{display: 'inline-flex', gap: '16px', alignItems: 'center'}}>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}&url=${encodeURIComponent(window.location.origin + window.location.pathname + '?post=' + currentPost.id)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{fontSize: '14px', color: 'var(--primary)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px'}} 
                      id="share-twitter-link"
                      className="hover-opacity"
                    >
                      <Twitter size={13} /> {translations[lang].shareTwitter}
                    </a>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleCopyShareableLink(currentPost.id, e)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: copiedPostId === currentPost.id ? '#10b981' : 'var(--theme)',
                    background: copiedPostId === currentPost.id ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary)',
                    border: `1px solid ${copiedPostId === currentPost.id ? '#10b981' : 'transparent'}`,
                    borderRadius: '20px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  id={`single-post-copy-btn-${currentPost.id}`}
                >
                  {copiedPostId === currentPost.id ? (
                    <>
                      <Check size={13} style={{strokeWidth: 2.5}} />
                      <span>{translations[lang].copiedLink}</span>
                    </>
                  ) : (
                    <>
                      <Link size={13} />
                      <span>{translations[lang].copyLink}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Prev / Next Pagination */}
              <nav className="paginav" style={{display: 'flex', justifyContent: 'space-between', gap: '20px', margin: '30px 0'}} id="single-post-paginav">
                {prevPost ? (
                  <a 
                    className="prev" 
                    href={`#post-${prevPost.id}`}
                    onClick={(e) => { e.preventDefault(); handlePostClick(prevPost.id); }}
                    style={{width: '50%', textDecoration: 'none', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', display: 'block'}}
                    id="paginav-prev-link"
                  >
                    <span style={{fontSize: '12px', color: 'var(--secondary)'}}>&larr; {translations[lang].prevPost}</span>
                    <div style={{fontWeight: '600', color: 'var(--primary)', fontSize: '14px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{prevPost.title}</div>
                  </a>
                ) : (
                  <div style={{width: '50%'}}></div>
                )}

                {nextPost ? (
                  <a 
                    className="next" 
                    href={`#post-${nextPost.id}`}
                    onClick={(e) => { e.preventDefault(); handlePostClick(nextPost.id); }}
                    style={{width: '50%', textDecoration: 'none', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', display: 'block', textAlign: 'right'}}
                    id="paginav-next-link"
                  >
                    <span style={{fontSize: '12px', color: 'var(--secondary)'}}>{translations[lang].nextPost} &rarr;</span>
                    <div style={{fontWeight: '600', color: 'var(--primary)', fontSize: '14px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{nextPost.title}</div>
                  </a>
                ) : (
                  <div style={{width: '50%'}}></div>
                )}
              </nav>

              <div style={{marginTop: '32px', textAlign: 'center'}} id="single-post-back-btn-area">
                <button 
                  onClick={() => setView('blog')} 
                  className="button"
                  style={{padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: 'var(--theme)', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', fontSize: '14px'}}
                  id="post-back-to-list-btn"
                >
                  <ArrowLeft size={16} aria-hidden="true" /> {translations[lang].backToBlog}
                </button>
              </div>
            </footer>
          </article>
        )}

        {/* VIEW 4: ARCHIVES VIEW */}
        {view === 'archive' && (
          <motion.div 
            id="archives-view-container"
            key="archive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="page-header" id="archives-header" style={{marginBottom: '32px'}}>
              <h1 style={{fontSize: '32px', fontWeight: '700', margin: '0 0 8px'}}>{translations[lang].archiveTitle}</h1>
              <p style={{color: 'var(--secondary)', fontSize: '14px'}}>
                {translations[lang].archiveSubtitle}
              </p>
            </div>

            <div className="archive-posts" id="archives-grouped-list" style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
              {Object.keys(getArchiveData()).sort((a, b) => b - a).map(year => (
                <div className="archive-year" key={year} id={`archive-year-section-${year}`}>
                  <h2 style={{fontSize: '24px', borderBottom: '2px solid var(--border)', paddingBottom: '8px', margin: '0 0 16px', fontWeight: '700', color: 'var(--primary)'}}>{year}</h2>
                  
                  {Object.keys(getArchiveData()[year]).map(month => (
                    <div className="archive-month" key={month} style={{display: 'flex', gap: '20px', marginBottom: '14px', flexWrap: 'wrap'}} id={`archive-month-section-${year}-${month}`}>
                      <div className="archive-month-header" style={{width: '120px', flexShrink: 0}}>
                        <h3 style={{fontSize: '18px', margin: 0, fontWeight: '600', color: 'var(--primary)'}}>{month}</h3>
                        <span className="archive-count" style={{fontSize: '12px', color: 'var(--secondary)'}}>
                          ({getArchiveData()[year][month].length} {getArchiveData()[year][month].length === 1 ? (translations[lang].archiveCountSuffixSingle || translations[lang].archiveCountSuffix) : translations[lang].archiveCountSuffix})
                        </span>
                      </div>
                      
                      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        {getArchiveData()[year][month].map(post => (
                          <div className="archive-entry" key={post.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingBottom: '8px', borderBottom: '1px dashed var(--border)'}} id={`archive-post-row-${post.id}`}>
                            <h4 className="archive-entry-title" style={{margin: 0, fontSize: '15px', fontWeight: '500'}}>
                              <a 
                                href={`#post-${post.id}`} 
                                onClick={(e) => { e.preventDefault(); handlePostClick(post.id); }}
                                style={{color: 'var(--primary)', textDecoration: 'none'}}
                                id={`archive-post-link-${post.id}`}
                              >
                                {post.title}
                              </a>
                            </h4>
                            <div className="archive-meta" style={{fontSize: '12px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)'}}>
                              {post.formattedDate} &middot; {getReadingTime(post)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 5: SEARCH VIEW */}
        {view === 'search' && (
          <motion.div 
            id="search-view-container"
            key="search"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="page-header" id="search-header" style={{marginBottom: '24px'}}>
              <h1 style={{fontSize: '32px', fontWeight: '700', margin: '0 0 8px'}}>{translations[lang].navSearch}</h1>
              <p style={{color: 'var(--secondary)', fontSize: '14px'}}>
                {translations[lang].searchHelpText}
              </p>
            </div>

            <div className="searchbox" style={{marginTop: '24px'}} id="search-input-area">
              <label htmlFor="search-input-field" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--secondary)', marginBottom: '8px'}}>
                {translations[lang].searchKeyword}
              </label>
              <input 
                type="search" 
                placeholder={translations[lang].searchPlaceholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  padding: '12px 16px',
                  fontSize: '16px',
                  width: '100%',
                  outline: 'none',
                  background: 'var(--code-bg)',
                  color: 'var(--primary)',
                  border: '2px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
                id="search-input-field"
              />
            </div>

            <ul className="searchResults" style={{listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px'}} id="search-results-list">
              {searchQuery.trim() === '' ? (
                <li style={{color: 'var(--secondary)', background: 'transparent', padding: '12px 0', textAlign: 'center'}} id="search-prompt-row">
                  {translations[lang].searchPrompt}
                </li>
              ) : getSearchResults().length === 0 ? (
                <li style={{color: 'var(--secondary)', background: 'transparent', padding: '12px 0', textAlign: 'center'}} id="search-empty-row">
                  {translations[lang].noMatchesFound} "{searchQuery}".
                </li>
              ) : (
                getSearchResults().map(post => (
                  <li 
                    key={post.id} 
                    style={{
                      cursor: 'pointer', 
                      border: '1px solid var(--border)', 
                      borderRadius: '8px', 
                      padding: '16px', 
                      background: 'var(--entry)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px'
                    }} 
                    onClick={() => handlePostClick(post.id)} 
                    id={`search-result-row-${post.id}`}
                  >
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                      <span style={{fontWeight: '600', color: 'var(--primary)', fontSize: '16px'}}>{post.title}</span>
                      <span style={{color: 'var(--secondary)', fontSize: '13px'}}>{highlightText(post.description, searchQuery)}</span>
                    </div>
                    <span style={{fontSize: '12px', color: 'var(--secondary)', whiteSpace: 'nowrap'}} className="archive-meta">
                      {post.formattedDate}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}

        {/* VIEW 6: TAGS CLOUD VIEW */}
        {view === 'tags' && (
          <motion.div 
            id="tags-view-container"
            key="tags"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="page-header" id="tags-header" style={{marginBottom: '24px'}}>
              <h1 style={{fontSize: '32px', fontWeight: '700', margin: '0 0 8px'}}>{translations[lang].tagsTitle}</h1>
              <p style={{color: 'var(--secondary)', fontSize: '14px'}}>
                {translations[lang].tagsSubtitle}
              </p>
            </div>

            <div className="tag-filter-box" style={{ marginTop: '20px', marginBottom: '24px' }} id="tag-filter-area">
              <input
                type="search"
                placeholder={translations[lang].tagSearchPlaceholder || "Cari tag..."}
                value={tagSearchQuery}
                onChange={(e) => setTagSearchQuery(e.target.value)}
                style={{
                  padding: '10px 14px',
                  fontSize: '14px',
                  width: '100%',
                  maxWidth: '320px',
                  outline: 'none',
                  background: 'var(--code-bg)',
                  color: 'var(--primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono, monospace)',
                  transition: 'border-color 0.15s ease'
                }}
                id="tag-search-input"
              />
            </div>

            {getTagsWithCounts().filter(({ name }) => 
              name.toLowerCase().includes(tagSearchQuery.toLowerCase().trim())
            ).length === 0 ? (
              <p style={{ color: 'var(--secondary)', fontSize: '14px', marginTop: '20px', fontFamily: 'var(--font-mono, monospace)' }}>
                {lang === 'id' ? 'Tidak ada tag yang cocok.' : lang === 'es' ? 'No se encontraron etiquetas.' : 'No matching tags found.'}
              </p>
            ) : (
              <ul className="terms-tags" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                listStyle: 'none',
                padding: 0,
                marginTop: '16px'
              }} id="tags-cloud-list">
                {getTagsWithCounts()
                  .filter(({ name }) => name.toLowerCase().includes(tagSearchQuery.toLowerCase().trim()))
                  .map(({ name, count }) => (
                    <li key={name} id={`tag-cloud-item-${name}`}>
                      <a 
                        href={`#tag-${name}`} 
                        onClick={(e) => { e.preventDefault(); handleTagClick(name); }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--code-bg)',
                          border: '1px solid var(--border)',
                          padding: '8px 16px',
                          borderRadius: '30px',
                          fontSize: '14px',
                          color: 'var(--primary)',
                          fontWeight: '500',
                          transition: 'transform 0.2s ease, border-color 0.2s'
                        }}
                        className="tag-link-item"
                        id={`tag-cloud-link-${name}`}
                      >
                        <Tag size={12} aria-hidden="true" />
                        <span>{name}</span>
                        <span style={{
                          fontSize: '11px', 
                          fontFamily: 'var(--font-mono, monospace)',
                          color: 'var(--secondary)',
                          marginLeft: '3px',
                          fontWeight: 'normal'
                        }}>
                          ({count})
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* VIEW 7: STUDIO HUB DASHBOARD (Admin Panel) */}
        {view === 'studio' && (
          <motion.div 
            id="studio-view-container"
            key="studio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="page-header" id="studio-header" style={{marginBottom: '32px'}}>
              <h1 style={{fontSize: '32px', fontWeight: '700', margin: '0 0 8px'}}>{translations[lang].navStudio}</h1>
              <p style={{color: 'var(--secondary)', fontSize: '14px'}}>
                {translations[lang].studioWelcomeText}
              </p>
            </div>

            {/* Part A: MTProto Telegram Connection & Media Manager */}
            <section style={{background: 'var(--entry)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '32px'}}>
              <h2 style={{fontSize: '20px', fontWeight: '700', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}>
                <ImageIcon size={20} aria-hidden="true" /> {translations[lang].tgTitle}
              </h2>

              {tgStep === 'config' && (
                <form onSubmit={handleTgRequestCode} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <p style={{fontSize: '14px', color: 'var(--secondary)', margin: 0}}>
                    {translations[lang].tgSubtitle}
                  </p>

                  <div className="responsive-grid-2">
                    <div>
                      <label htmlFor="apiId" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>API ID</label>
                      <input 
                        type="text" 
                        id="apiId"
                        placeholder="e.g. 123456"
                        value={telegramConfig.apiId}
                        onChange={(e) => setTelegramConfig({ ...telegramConfig, apiId: e.target.value })}
                        required
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                    <div>
                      <label htmlFor="apiHash" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>API Hash</label>
                      <input 
                        type="password" 
                        id="apiHash"
                        placeholder="e.g. abcd1234efgh5678"
                        value={telegramConfig.apiHash}
                        onChange={(e) => setTelegramConfig({ ...telegramConfig, apiHash: e.target.value })}
                        required
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                  </div>

                  <div className="responsive-grid-2">
                    <div>
                      <label htmlFor="phone" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].tgPhone}</label>
                      <input 
                        type="tel" 
                        id="phone"
                        placeholder="e.g. +62812345678"
                        value={telegramConfig.phone}
                        onChange={(e) => setTelegramConfig({ ...telegramConfig, phone: e.target.value })}
                        required
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                    <div>
                      <label htmlFor="channel" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].tgChannel}</label>
                      <input 
                        type="text" 
                        id="channel"
                        placeholder="e.g. @my_channel_name"
                        value={telegramConfig.channel}
                        onChange={(e) => setTelegramConfig({ ...telegramConfig, channel: e.target.value })}
                        required
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                  </div>

                  {tgError && (
                    <div style={{background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', padding: '10px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}}>
                      <AlertCircle size={16} aria-hidden="true" /> <span>{tgError}</span>
                    </div>
                  )}

                  {tgStatus && (
                    <div style={{background: 'var(--code-bg)', color: 'var(--secondary)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px'}}>
                      {tgStatus}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isTgTesting}
                    style={{
                      background: 'var(--primary)', 
                      color: 'var(--theme)', 
                      border: 'none', 
                      borderRadius: '6px', 
                      padding: '12px 20px', 
                      cursor: 'pointer', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isTgTesting ? translations[lang].btnConnecting : translations[lang].btnSendOtp} &rarr;
                  </button>
                </form>
              )}

              {tgStep === 'otp' && (
                <form onSubmit={handleTgSignIn} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <h3 style={{fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--primary)'}}>
                    {translations[lang].verifyTelegramCode}
                  </h3>
                  <p style={{fontSize: '13px', color: 'var(--secondary)', margin: 0}}>
                    {translations[lang].verifyTelegramCodeSubtitle}
                  </p>

                  <div className="responsive-grid-2">
                    <div>
                      <label htmlFor="otpCode" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>
                        {translations[lang].otpVerificationCode}
                      </label>
                      <input 
                        type="text" 
                        id="otpCode"
                        placeholder={translations[lang].placeholderOtp}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        required
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                    <div>
                      <label htmlFor="tgPassword" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>
                        {translations[lang].twoStepVerification}
                      </label>
                      <input 
                        type="password" 
                        id="tgPassword"
                        placeholder={translations[lang].placeholderPassword}
                        value={tgPassword}
                        onChange={(e) => setTgPassword(e.target.value)}
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>
                  </div>

                  {tgError && (
                    <div style={{background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', padding: '10px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}}>
                      <AlertCircle size={16} aria-hidden="true" /> <span>{tgError}</span>
                    </div>
                  )}

                  {tgStatus && (
                    <div style={{background: 'var(--code-bg)', color: 'var(--secondary)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px'}}>
                      {tgStatus}
                    </div>
                  )}

                  <div style={{display: 'flex', gap: '12px'}}>
                    <button 
                      type="submit" 
                      style={{
                        background: 'var(--primary)', 
                        color: 'var(--theme)', 
                        border: 'none', 
                        borderRadius: '6px', 
                        padding: '12px 20px', 
                        cursor: 'pointer', 
                        fontWeight: '600',
                        flex: 1
                      }}
                    >
                      {translations[lang].btnVerifyOtp}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setTgStep('config')}
                      style={{
                        background: 'var(--code-bg)', 
                        color: 'var(--primary)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '6px', 
                        padding: '12px 20px', 
                        cursor: 'pointer', 
                        fontWeight: '500'
                      }}
                    >
                      {translations[lang].cancel}
                    </button>
                  </div>
                </form>
              )}

              {tgStep === 'connected' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', color: 'rgb(16, 185, 129)', padding: '14px 20px', borderRadius: '8px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <CheckCircle size={20} aria-hidden="true" />
                      <div>
                        <div style={{fontWeight: '700', fontSize: '14px'}}>{translations[lang].tgSessionConnected}</div>
                        <div style={{fontSize: '12px', opacity: 0.9}}>{translations[lang].connectionActiveFor} {telegramConfig.channel}</div>
                      </div>
                    </div>
                    <button 
                      onClick={handleTgDisconnect}
                      style={{background: 'none', border: '1px solid rgb(16, 185, 129)', color: 'rgb(16, 185, 129)', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: '600'}}
                    >
                      {translations[lang].btnDisconnect}
                    </button>
                  </div>

                  {/* Upload Interface */}
                  <form onSubmit={handleTgUpload} style={{border: '1px dashed var(--border)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <h3 style={{fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <Upload size={16} aria-hidden="true" /> {translations[lang].uploadHeading}
                    </h3>

                    <div style={{display: 'grid', gridTemplateColumns: imagePreview ? '140px 1fr' : '1fr', gap: '16px'}}>
                      {imagePreview && (
                        <div style={{position: 'relative'}}>
                          <img 
                            src={imagePreview} 
                            alt={translations[lang].uploadPreview} 
                            style={{width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)'}} 
                          />
                        </div>
                      )}

                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px'}}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageSelect}
                          required
                          style={{fontSize: '14px'}}
                        />
                        <span style={{fontSize: '12px', color: 'var(--secondary)'}}>
                          {translations[lang].uploadSupports}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="caption" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].captionLabel}</label>
                      <input 
                        type="text" 
                        id="caption"
                        placeholder={translations[lang].captionPlaceholder}
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                      />
                    </div>

                    {tgError && (
                      <div style={{background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', padding: '10px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}}>
                        <AlertCircle size={16} aria-hidden="true" /> <span>{tgError}</span>
                      </div>
                    )}

                    {tgStatus && (
                      <div style={{background: 'var(--code-bg)', color: 'var(--secondary)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px'}}>
                        {tgStatus}
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isUploading || !selectedImage}
                      style={{
                        background: 'var(--primary)', 
                        color: 'var(--theme)', 
                        border: 'none', 
                        borderRadius: '6px', 
                        padding: '12px 20px', 
                        cursor: selectedImage ? 'pointer' : 'not-allowed', 
                        fontWeight: '600',
                        opacity: selectedImage ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {isUploading ? translations[lang].btnUploading : translations[lang].btnUpload} <Send size={14} aria-hidden="true" />
                    </button>
                  </form>
                </div>
              )}
            </section>

            {/* Telegram Uploads History */}
            {uploadedHistory.length > 0 && (() => {
              const filteredHistory = uploadedHistory.filter((item) => {
                const q = tgSearchQuery.toLowerCase();
                const matchesSearch = 
                  (item.fileName || '').toLowerCase().includes(q) || 
                  (item.caption || '').toLowerCase().includes(q);
                
                if (tgFilterType === 'all') return matchesSearch;
                const itemType = getMediaType(item);
                return matchesSearch && itemType === tgFilterType;
              });

              return (
                <section style={{background: 'var(--entry)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '32px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px', flexWrap: 'wrap'}}>
                    <h3 style={{fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--primary)'}}>{translations[lang].historyTitle}</h3>
                    <span style={{fontSize: '13px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)'}}>
                      {filteredHistory.length} / {uploadedHistory.length}
                    </span>
                  </div>

                  {/* Search and Filters controls */}
                  <div style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                      <Search size={16} style={{position: 'absolute', left: '12px', color: 'var(--secondary)'}} />
                      <input 
                        type="text"
                        placeholder={translations[lang].historySearchPlaceholder}
                        value={tgSearchQuery}
                        onChange={(e) => setTgSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px 8px 36px',
                          fontSize: '14px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: 'var(--code-bg)',
                          color: 'var(--primary)',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                      />
                      {tgSearchQuery && (
                        <button 
                          onClick={() => setTgSearchQuery('')}
                          style={{
                            position: 'absolute',
                            right: '12px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    {/* Filter pills */}
                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center'}}>
                      {[
                        { value: 'all', label: translations[lang].filterAll },
                        { value: 'image', label: translations[lang].filterImage },
                        { value: 'video', label: translations[lang].filterVideo },
                        { value: 'document', label: translations[lang].filterDocument }
                      ].map((f) => {
                        const isActive = tgFilterType === f.value;
                        return (
                          <button
                            key={f.value}
                            onClick={() => setTgFilterType(f.value)}
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              padding: '6px 14px',
                              borderRadius: '20px',
                              border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--border)'),
                              background: isActive ? 'var(--primary)' : 'transparent',
                              color: isActive ? 'var(--theme)' : 'var(--secondary)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {f.value === 'all' && <LayoutGrid size={12} />}
                            {f.value === 'image' && <ImageIcon size={12} />}
                            {f.value === 'video' && <Video size={12} />}
                            {f.value === 'document' && <FileText size={12} />}
                            <span>{f.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {filteredHistory.length === 0 ? (
                    <div style={{textAlign: 'center', padding: '24px 12px', color: 'var(--secondary)', fontSize: '14px', background: 'var(--code-bg)', borderRadius: '8px', border: '1px dashed var(--border)'}}>
                      {translations[lang].noHistoryFound}
                    </div>
                  ) : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      {filteredHistory.map((item) => {
                        const mdCode = `![${item.caption || item.fileName}](${item.link})`;
                        const itemType = getMediaType(item);
                        return (
                          <div key={item.id} style={{border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: 'var(--code-bg)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px', flexWrap: 'wrap'}}>
                              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: 'rgba(156, 163, 175, 0.1)',
                                  color: 'var(--secondary)'
                                }}>
                                  {itemType === 'image' && <ImageIcon size={12} />}
                                  {itemType === 'video' && <Video size={12} />}
                                  {itemType === 'document' && <FileText size={12} />}
                                </span>
                                <span style={{fontSize: '14px', fontWeight: '600', color: 'var(--primary)', wordBreak: 'break-all'}}>{item.fileName}</span>
                              </div>
                              <span style={{fontSize: '12px', color: 'var(--secondary)', fontFamily: 'var(--font-mono, monospace)'}}>{item.date}</span>
                            </div>
                            
                            {item.caption && (
                              <div style={{fontSize: '13px', color: 'var(--secondary)', margin: '-4px 0 10px 32px', fontStyle: 'italic'}}>
                                &ldquo;{item.caption}&rdquo;
                              </div>
                            )}

                            <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginLeft: item.caption ? '32px' : 0}}>
                              <input 
                                type="text" 
                                readOnly 
                                value={mdCode} 
                                style={{flex: 1, padding: '6px 10px', fontSize: '13px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', fontFamily: 'monospace'}}
                              />
                              <button 
                                onClick={() => copyToClipboard(mdCode, item.id)}
                                style={{
                                  background: 'var(--primary)', 
                                  color: 'var(--theme)', 
                                  border: 'none', 
                                  borderRadius: '4px', 
                                  padding: '6px 12px', 
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {copiedUrlIndex === item.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                                <span>{copiedUrlIndex === item.id ? translations[lang].copiedUrl : translations[lang].copyMdBtn}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })()}

             {/* Part B: Full Markdown Blog Composer */}
            <section style={{background: 'var(--entry)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px'}}>
              <h2 style={{fontSize: '20px', fontWeight: '700', margin: '0 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', color: 'var(--primary)'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Plus size={20} aria-hidden="true" /> {translations[lang].studioTitle}
                </span>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
                  <label 
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--theme)',
                      background: 'var(--primary)',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'opacity 0.2s'
                    }}
                    className="hover-opacity"
                  >
                    <FileText size={14} aria-hidden="true" />
                    <span>{translations[lang].btnImportMd}</span>
                    <input 
                      type="file" 
                      accept=".md,.mdx" 
                      onChange={handleImportMdFile} 
                      style={{display: 'none'}} 
                    />
                  </label>
                  {draftStatus && (
                    <span 
                      style={{
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: draftStatus === 'saving' ? 'var(--secondary)' : '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: draftStatus === 'saving' ? 'rgba(156, 163, 175, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-mono, monospace)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span 
                        style={{
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '50%', 
                          background: draftStatus === 'saving' ? 'var(--secondary)' : '#10b981',
                          display: 'inline-block',
                          animation: draftStatus === 'saving' ? 'pulse 1.5s infinite' : 'none'
                        }} 
                      />
                      {draftStatus === 'saving' ? translations[lang].draftSaving : translations[lang].draftSaved}
                    </span>
                  )}
                </div>
              </h2>

              <form onSubmit={handleCreatePost} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {postSuccess && (
                  <div style={{background: 'rgba(16, 185, 129, 0.1)', color: 'rgb(16, 185, 129)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600'}}>
                    {postSuccess}
                  </div>
                )}

                <div>
                  <label htmlFor="post-title" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldTitle}</label>
                  <input 
                    type="text" 
                    id="post-title"
                    placeholder={translations[lang].fieldTitlePlaceholder}
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                    style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                  />
                </div>

                <div className="responsive-grid-2">
                  <div>
                    <label htmlFor="post-author" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldAuthor}</label>
                    <input 
                      type="text" 
                      id="post-author"
                      placeholder={`e.g. ${profile.name}`}
                      value={newPost.author}
                      onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="post-tags" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldTags}</label>
                    <input 
                      type="text" 
                      id="post-tags"
                      placeholder="e.g. Tutorial, Telegram, Markdown"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="post-desc" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldDesc}</label>
                  <input 
                    type="text" 
                    id="post-desc"
                    placeholder={translations[lang].fieldDescPlaceholder}
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                  />
                </div>

                {/* Content Editor & Split Real-time Preview with Mode Switcher */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <label htmlFor="post-content" style={{fontSize: '13px', fontWeight: '600', color: 'var(--primary)', margin: 0}}>{translations[lang].fieldContent}</label>
                  <div style={{display: 'flex', gap: '4px', background: 'var(--code-bg)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border)'}}>
                    {[
                      { value: 'write', label: translations[lang].studioModeWrite },
                      { value: 'preview', label: translations[lang].studioModePreview },
                      { value: 'split', label: translations[lang].studioModeSplit }
                    ].map((mode) => {
                      const isActive = studioViewMode === mode.value;
                      return (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() => {
                            setStudioViewMode(mode.value);
                            localStorage.setItem('studio_view_mode', mode.value);
                          }}
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            background: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'var(--theme)' : 'var(--secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div 
                  style={{
                    display: studioViewMode === 'split' ? 'grid' : 'block', 
                    gridTemplateColumns: studioViewMode === 'split' ? '1fr 1fr' : 'none', 
                    gap: '16px', 
                    minHeight: '300px'
                  }} 
                  className="responsive-editor-split"
                >
                  {(studioViewMode === 'write' || studioViewMode === 'split') && (
                    <div style={{width: '100%'}}>
                      <textarea 
                        id="post-content"
                        placeholder={translations[lang].fieldContentPlaceholder}
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        required
                        style={{width: '100%', height: '380px', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5', resize: 'vertical'}}
                      />
                    </div>
                  )}
                  
                  {(studioViewMode === 'preview' || studioViewMode === 'split') && (
                    <div style={{width: '100%'}}>
                      <div 
                        style={{
                          width: '100%', 
                          height: '380px', 
                          padding: '16px', 
                          borderRadius: '6px', 
                          border: '1px solid var(--border)', 
                          background: 'var(--code-bg)', 
                          overflowY: 'auto', 
                          fontSize: '14px', 
                          lineHeight: '1.6'
                        }}
                        className="md-content"
                        dangerouslySetInnerHTML={renderMarkdown(newPost.content)}
                      />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  style={{
                    background: 'var(--primary)', 
                    color: 'var(--theme)', 
                    border: 'none', 
                    borderRadius: '6px', 
                    padding: '14px 24px', 
                    cursor: 'pointer', 
                    fontWeight: '700',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {translations[lang].btnPublish} &rarr;
                </button>
              </form>
            </section>

            {/* Part C: Edit Profile Settings */}
            <section style={{background: 'var(--entry)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginTop: '32px'}}>
              <h2 style={{fontSize: '20px', fontWeight: '700', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}>
                <User size={20} aria-hidden="true" /> {translations[lang].editProfileTitle}
              </h2>
              <p style={{fontSize: '14px', color: 'var(--secondary)', margin: '0 0 20px'}}>
                {translations[lang].editProfileSubtitle}
              </p>

              <form onSubmit={handleSaveProfile} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div className="responsive-grid-2">
                  <div>
                    <label htmlFor="profile-edit-name" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldProfileName}</label>
                    <input 
                      type="text" 
                      id="profile-edit-name"
                      value={profileEditData.name}
                      onChange={(e) => setProfileEditData({ ...profileEditData, name: e.target.value })}
                      required
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-edit-avatar" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldProfileAvatar}</label>
                    <input 
                      type="text" 
                      id="profile-edit-avatar"
                      value={profileEditData.avatar}
                      onChange={(e) => setProfileEditData({ ...profileEditData, avatar: e.target.value })}
                      required
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="profile-edit-bio-id" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldProfileBioId}</label>
                  <textarea 
                    id="profile-edit-bio-id"
                    value={profileEditData.bioId}
                    onChange={(e) => setProfileEditData({ ...profileEditData, bioId: e.target.value })}
                    rows="2"
                    style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)', resize: 'vertical'}}
                  />
                </div>

                <div>
                  <label htmlFor="profile-edit-bio-en" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldProfileBioEn}</label>
                  <textarea 
                    id="profile-edit-bio-en"
                    value={profileEditData.bioEn}
                    onChange={(e) => setProfileEditData({ ...profileEditData, bioEn: e.target.value })}
                    rows="2"
                    style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)', resize: 'vertical'}}
                  />
                </div>

                <div>
                  <label htmlFor="profile-edit-bio-es" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldProfileBioEs}</label>
                  <textarea 
                    id="profile-edit-bio-es"
                    value={profileEditData.bioEs}
                    onChange={(e) => setProfileEditData({ ...profileEditData, bioEs: e.target.value })}
                    rows="2"
                    style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)', resize: 'vertical'}}
                  />
                </div>

                <div className="responsive-grid-2">
                  <div>
                    <label htmlFor="profile-edit-github" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldGithub}</label>
                    <input 
                      type="text" 
                      id="profile-edit-github"
                      value={profileEditData.github}
                      onChange={(e) => setProfileEditData({ ...profileEditData, github: e.target.value })}
                      placeholder="https://github.com/..."
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-edit-twitter" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldTwitter}</label>
                    <input 
                      type="text" 
                      id="profile-edit-twitter"
                      value={profileEditData.twitter}
                      onChange={(e) => setProfileEditData({ ...profileEditData, twitter: e.target.value })}
                      placeholder="https://twitter.com/..."
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                </div>

                <div className="responsive-grid-2">
                  <div>
                    <label htmlFor="profile-edit-telegram" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldTelegram}</label>
                    <input 
                      type="text" 
                      id="profile-edit-telegram"
                      value={profileEditData.telegram}
                      onChange={(e) => setProfileEditData({ ...profileEditData, telegram: e.target.value })}
                      placeholder="https://t.me/..."
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-edit-website" style={{display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px'}}>{translations[lang].fieldWebsite}</label>
                    <input 
                      type="text" 
                      id="profile-edit-website"
                      value={profileEditData.website}
                      onChange={(e) => setProfileEditData({ ...profileEditData, website: e.target.value })}
                      placeholder="https://..."
                      style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--primary)'}}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  style={{
                    background: 'var(--primary)', 
                    color: 'var(--theme)', 
                    border: 'none', 
                    borderRadius: '6px', 
                    padding: '14px 24px', 
                    cursor: 'pointer', 
                    fontWeight: '700',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '8px'
                  }}
                >
                  {translations[lang].btnSaveProfile}
                </button>
              </form>
            </section>
          </motion.div>
        )}

      </main>

      <footer className="footer" id="main-footer-section" style={{borderTop: '1px solid var(--border)', marginTop: '40px', padding: '20px 0', fontSize: '13px', color: 'var(--secondary)'}}>
        <div style={{maxWidth: 'var(--nav-width)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '0 var(--gap)'}}>
          <span>&copy; 2026 <a href="/" onClick={(e) => { e.preventDefault(); setView('home'); }} style={{color: 'var(--secondary)', textDecoration: 'none', fontWeight: '500'}}>{profile.name}</a></span>
          <span style={{textAlign: 'right'}}>
            PexMod Hub
          </span>
        </div>
      </footer>

      {/* Back To Top Link */}
      <a 
        href="#top" 
        id="top-link" 
        className={`top-link ${showTopLink ? '' : 'hidden'}`} 
        onClick={scrollToTop} 
        title="Go to Top (Alt + G)" 
        accessKey="g"
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6" fill="currentColor" style={{width: '12px', height: '12px'}} aria-hidden="true">
          <path d="M12 6H0l6-6z" />
        </svg>
      </a>

      {/* Custom Toast Notification Manager */}
      <div 
        id="custom-toast-container" 
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '360px',
          width: 'calc(100% - 48px)',
        }}
        className="custom-toast-container"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            style={{
              background: 'var(--entry)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'var(--primary)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              animation: 'slideDownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {toast.type === 'success' && <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />}
              {toast.type === 'error' && <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />}
              {toast.type === 'info' && <Info size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />}
              <span style={{ fontSize: '13.5px', fontWeight: '500', lineHeight: '1.4' }}>{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--secondary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
              className="toast-close-btn"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
