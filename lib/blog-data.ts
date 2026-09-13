import { ToolCategory } from './tools-data';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  isoDate: string;
  coverImage: string;
  category: ToolCategory;
  categoryName: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  keywords: string[];
  relatedTool: {
    slug: string;
    name: string;
    shortDescription: string;
    category: ToolCategory;
    ctaText: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'How to Compress Images Without Losing Quality: Modern Web Guide',
    excerpt: 'Discover the technical mechanics of lossy vs. lossless compression, HTML5 Canvas quantization, and how to reduce file sizes by up to 85% directly in your browser.',
    publishedAt: 'March 10, 2026',
    isoDate: '2026-03-10',
    coverImage: 'https://picsum.photos/seed/image-compression-guide/1200/675',
    category: 'image',
    categoryName: 'Image Tools',
    readTime: '6 min read',
    author: {
      name: 'Alex Rivera',
      role: 'Frontend Performance Lead',
      avatar: 'https://picsum.photos/seed/author-alex/100/100',
    },
    keywords: [
      'image compression',
      'compress jpg png webp',
      'reduce image file size without losing quality',
      'client side image optimizer',
      'lossy vs lossless image compression',
    ],
    relatedTool: {
      slug: 'image-compressor',
      name: 'Image Compressor',
      shortDescription: 'Compress JPEG, PNG, and WebP images locally with custom quality controls and zero server uploads.',
      category: 'image',
      ctaText: 'Try Image Compressor Free',
    },
    content: `
Image payloads account for more than **60% of total transfer weight** on modern websites according to the HTTP Archive. Slow page loads directly degrade search engine rankings, reduce conversion rates, and consume user cellular bandwidth.

The challenge for creators, designers, and developers is balancing file size savings with visual fidelity. In this guide, we explore how modern compression algorithms work and how you can optimize images with zero quality degradation—without sending files to remote servers.

---

## 1. Lossless vs. Lossy Compression: The Core Difference

When optimizing digital media, you are choosing between two distinct mathematical paradigms:

### Lossless Compression
- **How it works:** Re-encodes pixel information into more compact mathematical structures (such as DEFLATE or Huffman coding) without discarding any original color data.
- **When to use:** Line art, screenshots with sharp text, icons, and diagrams where every pixel boundary must remain pristine.
- **Typical savings:** 10% to 30%.

### Lossy Compression
- **How it works:** Leverages human visual perception (psychovisual redundancy). The human eye is far more sensitive to variations in luminance (brightness) than chrominance (color). By selectively quantizing microscopic color gradients that the human eye cannot distinguish, lossy engines discard imperceptible data.
- **When to use:** Photographs, hero banners, product photography, and blog thumbnails.
- **Typical savings:** 60% to 85% with no visible difference at standard viewing distances.

---

## 2. Comparing Formats: WebP vs. JPEG vs. PNG

Selecting the correct target container is half the battle:

| Format | Transparency | Best For | Typical Size Savings |
| :--- | :--- | :--- | :--- |
| **WebP** | Yes (Alpha) | General web photography & illustrations | **25%–35% smaller** than comparable JPEG |
| **JPEG** | No | Complex photographic scenes | Industry standard baseline |
| **PNG** | Yes (Alpha) | UI graphics, crisp text, vector exports | High fidelity, larger payload |

> **Pro Tip:** In modern browsers (Chrome, Safari, Firefox, Edge), **WebP** enjoys over 97% global support. Converting older JPEG or PNG assets to WebP at 80%–85% quality frequently cuts file weight in half without optical blur.

---

## 3. How Browser-Native Compression Works

Historically, compressing images meant uploading confidential photos to third-party cloud servers running ImageMagick or Sharp. Today, the browser's native **HTML5 Canvas API** and **OffscreenCanvas** allow high-speed, 100% private optimization directly on your GPU and CPU:

1. **Local File Read:** The browser decodes the file using \`FileReader\` or \`createImageBitmap\` in local memory.
2. **Dimension Bounding:** If an image is 4000px wide but will only be displayed at 1200px max width on a retina screen, downscaling down to 1920px immediately eliminates 75% of surplus pixels.
3. **Lossy Quantization:** Canvas \`toBlob('image/jpeg', quality)\` or \`toBlob('image/webp', quality)\` applies the browser's internal SIMD-accelerated quantization matrix.
4. **Instant Download:** A local \`blob:\` URL is generated. The entire pipeline executes in under 200 milliseconds, and your files never touch a remote server.

---

## 4. Best Practices Checklist for Web Publishers

- **Cap max dimensions:** Never publish raw 24-megapixel camera files. Cap desktop hero images at 1920px width and mobile cards at 800px width.
- **Target 80%–85% Quality:** Setting quality between 0.80 and 0.85 strikes the ideal balance—dramatically reducing byte weight while keeping visual compression artifacts completely invisible.
- **Strip EXIF metadata:** Digital cameras attach GPS coordinates, camera models, and timestamps to photos. Stripping EXIF tags saves up to 64KB per image and preserves personal privacy.
- **Use Lazy Loading:** Always pair compressed images with HTML \`loading="lazy"\` and explicit \`width\` and \`height\` attributes to avoid Cumulative Layout Shift (CLS).

---

## Conclusion

You do not need paid desktop software or privacy-compromising cloud converter websites to achieve lightweight, fast-loading images. By combining format conversion with sensible resolution bounding, you can deliver lightning-fast web experiences effortlessly.
    `,
  },
  {
    slug: 'what-is-base64-encoding-and-when-to-use-it',
    title: 'What is Base64 Encoding and When Should You Actually Use It?',
    excerpt: 'Understand how Base64 transforms binary streams into safe ASCII characters, calculate the 33% payload overhead, and learn where Base64 shines in modern web architecture.',
    publishedAt: 'March 08, 2026',
    isoDate: '2026-03-08',
    coverImage: 'https://picsum.photos/seed/base64-developer-guide/1200/675',
    category: 'developer',
    categoryName: 'Developer & Code',
    readTime: '7 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Senior Systems Architect',
      avatar: 'https://picsum.photos/seed/author-elena/100/100',
    },
    keywords: [
      'base64 encoding',
      'base64 decode',
      'data uri image',
      'when to use base64',
      'binary to text conversion',
    ],
    relatedTool: {
      slug: 'base64-encoder-decoder',
      name: 'Base64 Encoder / Decoder',
      shortDescription: 'Encode and decode UTF-8 text strings and binary files with instant live conversion and byte-count counters.',
      category: 'developer',
      ctaText: 'Launch Base64 Encoder / Decoder',
    },
    content: `
Every software engineer and web developer encounters Base64 strings: JWT tokens, inline CSS background images, cryptographic public keys, and email attachments. Yet many developers misunderstand its purpose, often confusing encoding with encryption or using it in performance-critical paths where it harms page speed.

In this deep dive, we explore what Base64 is, how the mathematical encoding algorithm functions, and when you should—and should not—use it.

---

## 1. What is Base64?

**Base64 is a binary-to-text encoding scheme** that represents binary data using a set of 64 printable ASCII characters.

Computers naturally store data as 8-bit bytes (values ranging from 0 to 255). However, historical networking protocols (like SMTP for email, or early HTTP headers) were designed strictly to transfer 7-bit ASCII control characters and text. Transmitting raw binary bytes over such channels frequently corrupted data because specific byte sequences were interpreted as network control characters (like end-of-file markers).

Base64 solves this by choosing 64 safe, unambiguous characters that survive transmission across any communication protocol:
- **A–Z** (26 characters, values 0–25)
- **a–z** (26 characters, values 26–51)
- **0–9** (10 characters, values 52–61)
- **+** and **/** (2 characters, values 62 and 63)
- **=** (used as padding at the end)

---

## 2. The Mathematics: How Base64 Conversion Works

Base64 takes **three 8-bit bytes** (24 bits total) and splits them into **four 6-bit groups** (also 24 bits total). Each 6-bit group represents a number from 0 to 63, which directly maps to an ASCII character in the Base64 index table.

\`\`\`text
Original String:   "Man"
ASCII Values:      77         97         110
Binary (8-bit):    01001101   01100001   01101110
Combined (24-bit): 010011010110000101101110
Split to 6-bit:    010011     010110     000101     101110
Decimal Values:    19         22         5          46
Base64 Characters: T          W          F          u
Output:            "TWFu"
\`\`\`

### The 33% Size Overhead Penalty
Notice that 3 raw bytes turned into 4 characters. This mathematical expansion means **Base64 encoded data is always approximately 33% larger** than the raw binary source ($4 / 3 = 1.333$).

If you encode a 3MB image into Base64, the resulting string will weigh approximately 4MB.

---

## 3. When Should You Use Base64?

### Ideal Use Cases:
1. **Data URIs for Micro-Icons:** Inlining tiny SVG or PNG icons (< 2KB) directly into CSS stylesheets or HTML to eliminate redundant HTTP round-trips.
2. **Authentication Headers (Basic Auth & JWT):** Transmitting API credentials and cryptographically signed tokens via standard HTTP \`Authorization: Bearer <token>\` headers.
3. **Email Attachments (MIME):** The SMTP standard requires media attachments to be serialized as 7-bit ASCII text.
4. **Cryptographic Keys & Hashes:** Formatting raw SHA-256 binary digest arrays into human-readable strings for API keys and certificates.

---

## 4. When NOT to Use Base64

- **Never use Base64 for Large Images or Videos:** Embedding a 500KB banner directly into HTML prevents browser caching, bloats initial DOM parse time, and increases network bandwidth consumption by a third.
- **Base64 is NOT Encryption:** Anyone can decode a Base64 string instantly in two seconds using standard terminal commands (\`echo "..." | base64 -d\`) or our online decoder tool. Never store sensitive passwords or credit card numbers in Base64 expecting privacy!

---

## Summary

Base64 is a reliable protocol serialization utility, not a security mechanism. Use it when binary payloads must cross text-only boundaries, and keep large media files as external binary assets with proper HTTP caching headers.
    `,
  },
  {
    slug: 'mastering-json-formatting-and-validation',
    title: 'Mastering JSON Formatting and Schema Validation in Web Development',
    excerpt: 'A comprehensive guide to debugging malformed JSON, understanding strict RFC 8259 syntax constraints, and optimizing API serialization workflows.',
    publishedAt: 'March 05, 2026',
    isoDate: '2026-03-05',
    coverImage: 'https://picsum.photos/seed/json-formatter-guide/1200/675',
    category: 'developer',
    categoryName: 'Developer & Code',
    readTime: '6 min read',
    author: {
      name: 'Devon Vance',
      role: 'API Infrastructure Engineer',
      avatar: 'https://picsum.photos/seed/author-devon/100/100',
    },
    keywords: [
      'json formatter',
      'json validator',
      'pretty print json',
      'fix json errors',
      'json syntax rules',
    ],
    relatedTool: {
      slug: 'json-formatter',
      name: 'JSON Formatter & Validator',
      shortDescription: 'Format, validate, beautify, and minify raw JSON payloads with live syntax error detection and hierarchy tree inspector.',
      category: 'developer',
      ctaText: 'Open JSON Formatter & Validator',
    },
    content: `
JavaScript Object Notation (JSON) is the universal lingua franca of web APIs, configuration files, and cloud databases. Despite its widespread adoption, developers waste hours every week wrestling with \`SyntaxError: Unexpected token\` and cryptic API rejection payloads.

Unlike loose JavaScript object literals, JSON is governed by the strict **RFC 8259** standard. In this guide, we break down the most common JSON errors and provide actionable validation strategies.

---

## 1. The 5 Most Common JSON Syntax Mistakes

Because JSON derives from JavaScript syntax, developers frequently make the mistake of using standard JS language shortcuts that are illegal in strict JSON:

### 1. Trailing Commas
In modern JavaScript arrays and objects, trailing commas are recommended. **In JSON, trailing commas are completely forbidden**:
\`\`\`json
//  Invalid JSON
{
  "name": "Project Alpha",
  "status": "active",
}

//  Valid JSON
{
  "name": "Project Alpha",
  "status": "active"
}
\`\`\`

### 2. Single Quotes Instead of Double Quotes
JSON strings and keys **must** be wrapped in double quotes (\`"\`). Single quotes (\`'\`) or backticks (\`\`\`) will throw an immediate parsing exception:
\`\`\`json
//  Invalid JSON
{
  'apiKey': 'secret_123'
}

//  Valid JSON
{
  "apiKey": "secret_123"
}
\`\`\`

### 3. Unquoted Object Keys
In JavaScript, writing \`{ id: 101 }\` is valid. In JSON, every key name is required to be a double-quoted string:
\`\`\`json
//  Valid JSON
{
  "id": 101
}
\`\`\`

### 4. Comments
JSON does not support comments (\`//\` or \`/* */\`). If you need comments for human configuration, consider using JSONC or YAML.

### 5. Special Number Formats
JSON only supports standard decimal numbers. \`NaN\`, \`Infinity\`, and hexadecimal numbers (\`0xFF\`) are invalid JSON values.

---

## 2. Formatting vs. Minification: Performance Tradeoffs

When designing API payloads and caching layers, consider how JSON formatting impacts your network and CPU metrics:

- **Pretty-Printed (Formatted) JSON:** Indented with 2 or 4 spaces and newlines. Essential for developer readability, terminal logs, and debugging environments. Adds 20%–40% byte weight.
- **Minified JSON:** Stripped of all superfluous spaces, tabs, and line breaks. Crucial for production API responses, CDN edge caches, and WebSocket streaming payloads to minimize throughput cost.

---

## 3. Client-Side Security: The Danger of \`eval()\`

In early web development, developers frequently deserialized JSON using JavaScript's \`eval('(' + jsonString + ')')\`. This creates severe **Remote Code Execution (RCE)** vulnerabilities because arbitrary malicious JavaScript code embedded in the payload will execute immediately on the client device.

Always parse JSON using native \`JSON.parse()\`, which strictly validates the syntax grammar without executing script bodies:
\`\`\`typescript
try {
  const data = JSON.parse(rawResponse);
  console.log("Valid payload:", data);
} catch (err) {
  console.error("Malformed JSON received:", err.message);
}
\`\`\`

---

## Conclusion

Mastering JSON comes down to respecting RFC 8259 syntax rules. By utilizing browser-based validators and formatters during development, you can diagnose API issues in seconds and ensure your applications communicate reliably.
    `,
  },
  {
    slug: 'regular-expressions-regex-guide-for-developers',
    title: 'The Practical Regex Guide: Mastering Regular Expressions in 2026',
    excerpt: 'Master regular expression syntax, capture groups, lookahead assertions, and learn how to avoid catastrophic backtracking in high-throughput applications.',
    publishedAt: 'March 01, 2026',
    isoDate: '2026-03-01',
    coverImage: 'https://picsum.photos/seed/regex-testing-guide/1200/675',
    category: 'developer',
    categoryName: 'Developer & Code',
    readTime: '8 min read',
    author: {
      name: 'Marcus Chen',
      role: 'Principal Security Researcher',
      avatar: 'https://picsum.photos/seed/author-marcus/100/100',
    },
    keywords: [
      'regex tester',
      'regular expression cheat sheet',
      'regex flags g i m',
      'regex email validation',
      'regex performance backtracking',
    ],
    relatedTool: {
      slug: 'regex-tester',
      name: 'Regex Tester & Debugger',
      shortDescription: 'Test and debug JavaScript regular expressions with real-time match highlighting, capture group extraction, and flag toggles.',
      category: 'developer',
      ctaText: 'Test Regex in Real-Time',
    },
    content: `
Regular expressions are among the most potent pattern-matching tools in a programmer's arsenal. From input validation and web scraping to log parsing and syntax highlighters, regex handles in one line what might otherwise take fifty lines of imperative parsing loops.

However, regex syntax can appear cryptic, and poorly constructed patterns can cause **Catastrophic Backtracking** that freezes servers and client browser tabs. Here is your definitive practical guide to writing robust, performant regular expressions.

---

## 1. The Core Regex Mental Model

At its heart, a regex engine processes text by stepping character-by-character through an input string, comparing against an automaton pattern:

### Character Classes & Shortcuts
- \`.\` : Matches any character except newlines
- \`\\d\` : Any digit (equivalent to \`[0-9]\`)
- \`\\w\` : Any word character (alphanumeric + underscore \`[a-zA-Z0-9_]\`)
- \`\\s\` : Any whitespace character (space, tab, newline)
- \`[A-Z]\` : Custom range (matches any uppercase letter)
- \`[^0-9]\` : Negation class (matches anything *except* digits)

### Quantifiers
- \`*\` : Zero or more times (greedy)
- \`+\` : One or more times (greedy)
- \`?\` : Zero or one time (optional)
- \`{3,8}\` : Between 3 and 8 times
- \`*?\` or \`+?\` : Lazy quantifier (matches as few characters as possible)

### Boundary Anchors
- \`^\` : Start of line or string
- \`$\` : End of line or string
- \`\\b\` : Word boundary

---

## 2. Practical Examples: Real-World Patterns

### 1. Robust Email Pattern (RFC-Compliant Simplicity)
\`\`\`regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\`\`\`
*Matches user accounts with standard alpha-numeric characters, subdomains, and top-level domains.*

### 2. ISO 8601 Date Format (\`YYYY-MM-DD\`)
\`\`\`regex
^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$
\`\`\`
*Validates 4-digit years, months 01-12, and calendar days 01-31.*

---

## 3. Advanced Technique: Lookahead and Lookbehind

Lookaround assertions are non-capturing assertions that match characters based on what follows or precedes them, without including those characters in the matched result:

- **Positive Lookahead \`(?=...)\`:** Asserts that the pattern matches immediately ahead.
- **Negative Lookahead \`(?!...)\`:** Asserts that the pattern does *not* match ahead.
- **Positive Lookbehind \`(?<=...)\`:** Asserts that the pattern matches immediately behind.
- **Negative Lookbehind \`(?<!...)\`:** Asserts that the pattern does *not* match behind.

**Example: Strong Password Validation in a Single Regex**
\`\`\`regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$
\`\`\`
This expression uses multiple positive lookaheads to enforce:
1. At least one lowercase letter
2. At least one uppercase letter
3. At least one digit
4. At least one special symbol
5. Minimum length of 8 characters

---

## 4. Preventing ReDoS (Catastrophic Backtracking)

A **Regular Expression Denial of Service (ReDoS)** occurs when a regex engine encounters nested quantifiers over overlapping character sets, such as \`(a+)+\$.

When testing against an input like \`aaaaaaaaaaaaaaaaaaaaaaaaaaaa!\`, the engine explores every permutation exponentially ($O(2^n)$), locking 100% of the CPU core for minutes.

### Golden Rules to Prevent ReDoS:
- Never nest quantifiers (e.g. avoid \`(x+)*\` or \`(a|a)*\`).
- Anchor your patterns with \`^\` and \`$\` whenever validating entire strings.
- Prefer atomic grouping or non-backtracking alternatives when parsing massive text streams.

---

## Testing Patterns in Real-Time

Never deploy a regular expression to production without thoroughly testing boundary conditions. Use our interactive in-browser Regex Tester to inspect capture groups, test multi-line flags, and verify performance instantly.
    `,
  },
  {
    slug: 'password-entropy-explained-how-to-generate-secure-passwords',
    title: 'Password Entropy Explained: How to Generate Truly Uncrackable Passwords',
    excerpt: 'Understand the mathematical equation of information entropy, calculate modern GPU brute-force times, and learn how to generate secure, uncrackable credentials.',
    publishedAt: 'February 26, 2026',
    isoDate: '2026-02-26',
    coverImage: 'https://picsum.photos/seed/password-security-guide/1200/675',
    category: 'utility',
    categoryName: 'Everyday Utilities',
    readTime: '7 min read',
    author: {
      name: 'Samantha Wu',
      role: 'Cybersecurity Analyst & Cryptographer',
      avatar: 'https://picsum.photos/seed/author-samantha/100/100',
    },
    keywords: [
      'password entropy',
      'password generator',
      'brute force time',
      'cryptographic security',
      'web crypto api getrandomvalues',
    ],
    relatedTool: {
      slug: 'password-generator',
      name: 'Password Generator & Entropy Meter',
      shortDescription: 'Generate cryptographically random passwords with custom lengths, character pools, and live bits-of-entropy scoring.',
      category: 'utility',
      ctaText: 'Generate Cryptographic Password',
    },
    content: `
Data breaches expose billions of user credentials every year. Despite years of security education, standard user-selected passwords like \`Password123!\` or common family names continue to dominate breach databases.

To understand true credential strength, computer scientists rely on a mathematical metric called **Information Entropy**. In this article, we explain how password entropy is calculated, how fast modern GPU cracking rigs can crack weak secrets, and how to generate mathematically secure passwords.

---

## 1. What is Password Entropy?

In computer science, entropy (measured in **bits**) represents the measure of unpredictability or randomness in a password. It answers the fundamental question: *If an attacker knows the exact rules used to generate your password, how many guesses would they have to make on average to crack it?*

The mathematical formula for password entropy is:

$$H = L \\times \\log_2(R)$$

Where:
- **$H$** = Entropy in bits
- **$L$** = Password length (number of characters)
- **$R$** = Size of the character pool (alphabet size)

---

## 2. Character Pool Sizes ($R$)

The size of the pool depends on what character classes are enabled:
- **Numbers only (0-9):** $R = 10$
- **Lowercase letters (a-z):** $R = 26$
- **Mixed case (a-z, A-Z):** $R = 52$
- **Letters and numbers (a-z, A-Z, 0-9):** $R = 62$
- **Letters, numbers, and symbols:** $R \\approx 94$

### The Impact of Length vs. Complexity
Notice that **length ($L$) multiplies entropy linearly**, whereas increasing character variety ($R$) only grows logarithmically ($\log_2$).

Consider these two examples:
- An 8-character password with letters, numbers, and symbols ($R=94$):
  $$H = 8 \\times \\log_2(94) \\approx 8 \\times 6.55 = \\mathbf{52.4\\text{ bits}}$$
- A 16-character password using only lowercase letters ($R=26$):
  $$H = 16 \\times \\log_2(26) \\approx 16 \\times 4.70 = \\mathbf{75.2\\text{ bits}}$$

Even though the 16-character password used fewer character types, its extra length makes it **over 8 million times harder to brute-force** than the complex 8-character password!

---

## 3. How Much Entropy Do You Need?

| Entropy Score | Security Classification | Time to Crack (Modern 8x RTX 4090 GPU Rig) |
| :--- | :--- | :--- |
| **< 40 bits** | Very Weak | Less than a second |
| **40 – 60 bits** | Weak | A few minutes to several hours |
| **60 – 80 bits** | Reasonable | Months to several years |
| **80 – 100 bits** | Strong | Thousands of years |
| **100+ bits** | Uncrackable | Millions of centuries (Beyond heat-death of universe) |

> **Target Standard:** For critical accounts (email, password managers, financial institutions), aim for at least **75 to 80 bits of entropy** (typically 16 characters or longer with mixed characters).

---

## 4. Why You Must Use \`crypto.getRandomValues()\`

When generating passwords programmatically in the browser, many naive scripts use JavaScript's built-in \`Math.random()\`.

**Never use \`Math.random()\` for cryptographic secrets.** \`Math.random()\` is a Pseudo-Random Number Generator (PRNG) built for games and animations. Its internal seed state can be reverse-engineered after observing just a handful of outputs.

Modern web browsers provide the **Web Crypto API**:
\`\`\`javascript
//  Cryptographically Secure Pseudorandom Generator (CSPRNG)
const array = new Uint32Array(1);
window.crypto.getRandomValues(array);
\`\`\`
The Web Crypto API draws biological and hardware entropy from OS kernel thermal noise, disk timings, and CPU interrupts, guaranteeing cryptographically unpredictable random values.

---

## Generate Secure Passwords Instantly

Protect your accounts with randomly generated high-entropy passwords. Use our free, browser-native Password Generator to create secure credentials with customizable character sets and live entropy verification.
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
