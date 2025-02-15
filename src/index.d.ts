import type { Browser, Options } from './plugin/launcher';

/**
 * Describes a time limit that can be used to filter fingerprints.
 *
 * The `*` option means that no time filter will be applied.
 */
export type Time = '*' | '15 days' | '30 days' | '60 days';

/**
 * Describes a tag value that can be used to filter fingerprints.
 *
 * The `*` option means that no tag filter will be applied.
 */
export type Tag =
  | '*'
  | 'Mobile'
  | 'Desktop'
  | 'Microsoft Windows'
  | 'Microsoft Windows Phone'
  | 'Apple Mac'
  | 'Android'
  | 'Linux'
  | 'iPad'
  | 'iPhone'
  | 'Edge'
  | 'Chrome'
  | 'Safari'
  | 'Firefox'
  | 'YaBrowser'
  | 'Windows 7'
  | 'Windows 8'
  | 'Windows 10';

/**
 * Options related to the browser fingerprint configuration.
 */
export interface FingerprintOptions {
  /**
   * Allows you to better emulate devices with higher pixel density.
   *
   * If this option is enabled, emulation will be done in the most natural way.
   * It means that the browser will render the page at a higher resolution, just like on a real device.
   * The trade-off is higher system resource usage because you need to do more calculations to render the bigger picture.
   *
   * The **JavaScript** options related to pixel density, such as `devicePixelRatio`, will be replaced correctly whether this option is enabled or not.
   * @default true
   */
  emulateDeviceScaleFactor?: boolean;

  /**
   * The **Chrome** browser has a Sensor API that allows you to read data from devices such as accelerometer, gyroscope and others. Data from these devices is only available on mobile platforms.
   *
   * After enabling this option, data for these devices will be generated and replaced automatically. Enable this option to emulate mobile fingerprints more accurately.
   * @default true
   */
  emulateSensorAPI?: boolean;

  /**
   * If this option is set to `true`, the **PerfectCanvas** replacement will be enabled. The fingerprint must contain the **PerfectCanvas** data in order for it to work.
   * @default true
   */
  usePerfectCanvas?: boolean;

  /**
   * By default browser searches for fonts only in system font folder. This may lead to inconsistencies during fingerprint emulation if target fingerprint has more fonts than local system.
   * Therefore, it's recommended to download font pack with most popular fonts. This setting allows to use font pack if it's installed.
   *
   * More info about font pack and download link can be found [here](https://wiki.bablosoft.com/doku.php?id=fontpack).
   * @default true
   */
  useFontPack?: boolean;

  /**
   * If this option is set to `true`, API results that return element coordinates will be updated to protect against `ClientRects` fingerprinting.
   * @default false
   */
  safeElementSize?: boolean;

  /**
   * If this option is set to `true`, the battery API will show a different value for each thread, which will prevent sites from identifying your real identity.
   *
   * In case the device from which the fingerprint was obtained does not have a battery API, it will always return 100% battery level.
   * @default true
   */
  safeBattery?: boolean;

  /**
   * If this option is set to `true`, canvas will be enabled, and noise will be added to all data returned from canvas.
   * @default true
   */
  safeCanvas?: boolean;

  /**
   * If this option is set to `true`, audio will be enabled, and noise will be added to the sound, and your hardware properties, such as the sample rate and number of channels will be changed.
   * @default true
   */
  safeAudio?: boolean;

  /**
   * If this option is set to `true`, **WebGL** will be enabled, and noise will be added to the **WebGL** canvas, and your hardware properties, such as the video card manufacturer and renderer will be changed.
   * @default true
   */
  safeWebGL?: boolean;
}

/**
 * Options related to the browser profile configuration.
 */
export interface ProfileOptions {
  /**
   * Always load a fingerprint from the profile folder.
   *
   * In case the profile folder already exists and contains fingerprint data, tell the plugin to apply the last fingerprint used for this profile.
   * @default true
   */
  loadFingerprint?: boolean;

  /**
   * Always load a proxy from the profile folder.
   *
   * In case the profile folder already exists and contains proxy data, tell the plugin to apply the last proxy used for this profile.
   * @default true
   */
  loadProxy?: boolean;
}

/**
 * Options related to the browser proxy configuration.
 */
export interface ProxyOptions {
  /**
   * Change the browser language according to the country of the proxy server.
   * This setting will change the `Accept-Language` header as well as the `navigator.language` and `navigator.languages` javascript properties.
   * @default true
   */
  changeBrowserLanguage?: boolean;

  /**
   * Change the geolocation of your browser to match the IP address of the proxy server.
   * The location will be set at a point close to the longitude and latitude of the server.
   * If this option is disabled, the browser's request to access your geolocation will be rejected.
   * @default false
   */
  changeGeolocation?: boolean;

  /**
   * Determine the IP address of the proxy server by requesting an external service.
   * This option can be used if the IP address that you use to connect the proxy server does not match the IP address that is visible to the site (external IP address).
   * @default true
   */
  detectExternalIP?: boolean;

  /**
   * Change your browser's timezone to match the IP address of the proxy server.
   * For example, if the proxy server is located in the United Kingdom, then the browser's time zone offset will be `UTC+00:00`.
   * @default true
   */
  changeTimezone?: boolean;

  /**
   * Replace the IP address provided by **WebRTC** with the IP address of the proxy server.
   * @default true
   */
  changeWebRTC?: boolean;

  /**
   * The method that will be used to get information about the IP.
   *
   * By default, the internal `database` method is used - it is fast and always available.
   * Even though the database is constantly updated, this method may not be the most accurate compared to others.
   * So you can also use `ip-api.com` service - the free version has a limit of 45 requests per IP (unlike the full version).
   */
  ipInfoMethod?: string;

  /**
   * API key from the [ip-api.com](https://ip-api.com/) service (available after purchase).
   * This parameter is used only if the method is set to `ip-api.com` value.
   */
  ipInfoKey?: string;
}

/**
 * Fetch options related to the browser fingerprint.
 */
export interface FetchOptions {
  /**
   * In case the fingerprint with the specified **PerfectCanvas** request is not in the static database, the canvas data will be rendered in real time from the machines that are currently connected.
   *
   * This is the default behavior, but sometimes you can avoid static database queries and use dynamic rendering instantly.
   * In order to do that, set this option to `false`.
   *
   * This option has no effect if the **PerfectCanvas** request is not specified or if the custom servers are used.
   *
   * @default true
   */
  enablePrecomputedFingerprints?: boolean;

  /**
   * This option is only useful if the custom server feature is enabled in your account. Otherwise, it will always throw an error.
   *
   * If you have this option enabled, the fingerprint will be received only from the custom server. It's also compatible with the **PerfectCanvas**.
   *
   * @default false
   */
  enableCustomServer?: boolean;

  /**
   * In case the fingerprint with the specified **PerfectCanvas** request is not in the static database, the canvas data will be rendered in real time from the machines that are currently connected.
   *
   * This is the default behavior, but sometimes you can avoid dynamic rendering to save time or for another reason.
   * In order to do this, set this option to `false`.
   *
   * This option has no effect if the **PerfectCanvas** request is not specified.
   *
   * @default true
   */
  dynamicPerfectCanvas?: boolean;

  /**
   * The **PerfectCanvas** request contains all the data required to render canvas on the remote machine.
   *
   * In order to obtain a request, use the `CanvasInspector` application, see the wiki for more information and download links.
   * The **PerfectCanvas** request data is obtained once for the site, not for each fingerprint request.
   */
  perfectCanvasRequest?: string;

  /**
   * Is it necessary to add logs when getting fingerprints with the **PerfectCanvas**.
   * @default false
   */
  perfectCanvasLogs?: boolean;

  /**
   * Select only those fingerprints that have a specific browser version.
   * It's recommended to use this option together with an explicit browser name.
   *
   * For example, you can choose fingerprints for the **Chrome** browser with a version lower than `115`.
   * You can also select the exact version by setting this option to the same value as for `minBrowserVersion`.
   *
   * The preferred option is to use the `current` value - this way the filter will use the current browser version installed for the plugin.
   * It can be very convenient, as the maximum versions of the browser and fingerprint will be exactly the same.
   *
   * If this option is not specified, a fingerprint with no maximum version limit will be selected.
   */
  maxBrowserVersion?: number | 'current';

  /**
   * Select only those fingerprints that have a specific browser version.
   * It's recommended to use this option together with an explicit browser name.
   *
   * For example, you can choose fingerprints for the **Chrome** browser with a version higher than `115`.
   * You can also select the exact version by setting this option to the same value as for `maxBrowserVersion`.
   *
   * The preferred option is to use the `current` value - this way the filter will use the current browser version installed for the plugin.
   * It can be very convenient, as the minimum versions of the browser and fingerprint will be exactly the same.
   *
   * If this option is not specified, a fingerprint with no minimum version limit will be selected.
   */
  minBrowserVersion?: number | 'current';

  /**
   * Select only those fingerprints whose maximum browser height matches the specified one.
   *
   * If this option is not specified, a fingerprint without a maximum height limit will be selected.
   */
  maxHeight?: number;

  /**
   * Select only those fingerprints whose minimum browser height matches the specified one.
   *
   * If this option is not specified, a fingerprint without a minimum height limit will be selected.
   */
  minHeight?: number;

  /**
   * Select only those fingerprints whose maximum browser width matches the specified one.
   *
   * If this option is not specified, a fingerprint without a maximum width limit will be selected.
   */
  maxWidth?: number;

  /**
   * Select only those fingerprints whose minimum browser width matches the specified one.
   *
   * If this option is not specified, a fingerprint without a minimum width limit will be selected.
   */
  minWidth?: number;

  /**
   * Select only those fingerprints whose date of addition matches the specified one.
   *
   * If this option is not specified, a fingerprint without an addition date limit will be selected.
   */
  timeLimit?: Time;

  /**
   * Select the system and device for which you want to get a fingerprint.
   *
   * Multiple tags can be combined together, in which case the service will only return
   * fingerprints that match all of the specified tags.
   *
   * If this option is not specified, a fingerprint will be obtained for any of the possible tags.
   */
  tags?: Tag[];
}

/**
 * Describes a plugin that is capable of fetching a fingerprint and launching a browser instance using it.
 */
export declare class FingerprintPlugin {
  /**
   * Get a list of all available browser versions.
   *
   * One possible use case would be to get a list of all versions using this method, and then launch a specific browser using an identifier
   * or a version string. In addition, it can be used when obtaining a fingerprint to filter by the minimum and maximum version.
   *
   * If the `format` parameter is set to `extended`, a list of objects will be returned, each containing detailed information about the
   * corresponding version - architecture, identifier, and so on. Otherwise, a simple list of browser versions will be returned.
   * The results are always sorted by version in descending order, i.e. the latest version will be listed first.
   *
   * @example
   * ```js
   * // Get a list of versions in extended format.
   * const versions = await plugin.versions('extended');
   *
   * // Force the plugin to use the latest version.
   * plugin.useBrowserVersion(versions[0]['browser_version']);
   * ```
   *
   * @param format - The output format of the returned result.
   * @returns The list of objects with detailed version information, or a list of strings.
   */
  versions<T extends string = 'default'>(format?: T): Promise<T extends 'extended' ? Version[] : string[]>;

  /**
   * Set the fingerprint settings using the specified fingerprint as a string and additional options when specified.
   * They will be used when launching the browser using the `spawn` or `launch` methods.
   *
   * You can chain method calls to set up a proxy, profile and fingerprint.
   * As a result, they return the current instance of the plugin, so you can call them in any order, and launch the browser immediately after application.
   *
   * See the [documentation](https://github.com/CheshireCaat/browser-with-fingerprints#fingerprint-usage) for more details.
   *
   * @remarks
   * **NOTE**: This method performs the fingerprint setup once. After launching the browser, the data cannot be changed.
   * In order to change fingerprint again, you'll need to restart the browser with different settings or launch a separate browser instance.
   *
   * @example
   * ```js
   * // Just for an example, you need to use the real value:
   * const fingerprint = '...';
   *
   * // The browser will be launched with the specified fingerprint:
   * const browser = await plugin.useFingerprint(fingerprint).launch();
   * ```
   *
   * @param value - Fingerprint value as a string.
   * @param options - Set of configurable options for applying a fingerprint.
   * @returns The same plugin instance with an updated settings (for optional chaining).
   */
  useFingerprint(value?: string, options?: FingerprintOptions): this;

  /**
   * Set the profile settings using the specified profile as a string and additional options when specified.
   * They will be used when launching the browser using the `spawn` or `launch` methods.
   *
   * You can chain method calls to set up a proxy, profile and fingerprint.
   * As a result, they return the current instance of the plugin, so you can call them in any order, and launch the browser immediately after application.
   *
   * See the [documentation](https://github.com/CheshireCaat/browser-with-fingerprints#profile-usage) for more details.
   *
   * @remarks
   * **NOTE**: This method performs the profile setup once. After launching the browser, the data cannot be changed.
   * In order to change profile again, you'll need to restart the browser with different settings or launch a separate browser instance.
   *
   * @example
   * ```js
   * // Just for an example, you need to use the real value:
   * const profile = '...';
   *
   * // The browser will be launched with the specified profile:
   * const browser = await plugin.useProfile(profile).launch();
   * ```
   *
   * @param value - Profile value as a string.
   * @param options - Set of configurable options for applying a profile.
   * @returns The same plugin instance with an updated settings (for optional chaining).
   */
  useProfile(value?: string, options?: ProfileOptions): this;

  /**
   * Set the proxy settings using the specified proxy as a string and additional options when specified.
   * They will be used when launching the browser using the `spawn` or `launch` methods.
   *
   * You can chain method calls to set up a proxy, profile and fingerprint.
   * As a result, they return the current instance of the plugin, so you can call them in any order, and launch the browser immediately after application.
   *
   * See the [documentation](https://github.com/CheshireCaat/browser-with-fingerprints#proxy-usage) for more details.
   *
   * @remarks
   * **NOTE**: This method performs the proxy setup once. After launching the browser, the data cannot be changed.
   * In order to change proxy again, you'll need to restart the browser with different settings or launch a separate browser instance.
   *
   * @example
   * ```js
   * // Just for an example, you need to use the real value:
   * const proxy = '...';
   *
   * // The browser will be launched with the specified proxy:
   * const browser = await plugin.useProxy(proxy).launch();
   * ```
   *
   * @param value - Proxy value as a string.
   * @param options - Set of configurable options for applying a proxy.
   * @returns The same plugin instance with an updated settings (for optional chaining).
   */
  useProxy(value?: string, options?: ProxyOptions): this;

  /**
   * Set the current browser version used by the plugin instance.
   *
   * Initially, the `default` value is used, which means that the latest available version will be used.
   * The same behavior can be achieved by passing an empty string or a zero identifier as a parameter to this method.
   * Also you can use the `random` value to select a random version, or use the version identifier instead of the version string.
   *
   * In order to get a list of available versions, use the `versions` method - the return values (version numbers and identifiers) can be used for this method.
   *
   * @example
   * ```js
   * // Use a specific version:
   * plugin.useBrowserVersion('115.0.5790.99');
   *
   * // Use the latest available version:
   * plugin.useBrowserVersion('default');
   * ```
   *
   * @param version - Version value as a string.
   * @returns The same plugin instance with an updated settings (for optional chaining).
   */
  useBrowserVersion(version: string): this;

  /**
   * Obtain a fingerprint using the specified service key and additional options.
   *
   * You can use various options to get a fingerprint according to certain criteria, depending on your needs.
   * The main parameter that filters fingerprints is tags. With them, you can choose options for specific operating systems, browsers and devices.
   * It's very handy because you can combine several tags together and thus get fingerprints for any situation.
   *
   * Other options are also useful. For example, you can get fingerprints in which the screen sizes will be limited to the values that you specify using the `minWidth` and `minHeight` options.
   * Or, if you want to use specific browser versions, you can use the `minBrowserVersion` and `maxBrowserVersion` options, which will filter out fingerprints that don't match the specified criteria.
   *
   * A fingerprint is an object with many properties that will be used for emulation. By default it's stored as a `JSON` string. It's strongly not recommended to change its parameters
   * manually if you aren't sure about what you are doing, otherwise correct operation of the fingerprint and anonymity of the browser is not guaranteed.
   *
   * You don't have to use this method all the time. After receiving the fingerprint, you can safely save it to a file or database, and request it from there during the next launches.
   *
   * For more information about fingerprints, please visit [this](https://fingerprints.bablosoft.com) website.
   *
   * @remarks
   * **NOTE**: Please keep in mind that resizing the browser when using fingerprints can negatively affect anonymity.
   *
   * @example
   * An example of obtaining a fingerprint:
   *
   * ```js
   * const result = await plugin.fetch('FINGERPRINT_KEY', {
   *   tags: ['Desktop', 'Chrome'],
   *   minBrowserVersion: 115,
   *   timeLimit: '15 days',
   * });
   * ```
   *
   * @param key - Service key for obtaining a fingerprint.
   * @param options - Set of configurable options for getting a browser fingerprint.
   * @returns Promise which resolves to a fingerprint string.
   */
  fetch(key: string, options?: FetchOptions): Promise<string>;

  /**
   * Launches a browser instance with given arguments and options when specified.
   *
   * Note that this method only starts the browser process, but does not connect to it.
   * You will need to do it yourself using any framework that is convenient for you.
   *
   * When working with the plugin, it will be much more convenient to use the alternative `launch` method, which is defined
   * only in derived plugins (not implemented in **browser-with-fingerprints** package), which immediately launches the
   * browser, connects to it and does not require additional actions. Otherwise, you will need to connect to
   * the browser manually, as well as configuring the viewport size when opening a new window
   * (using the {@link Browser.configure} method) if a fingerprint is set.
   *
   * @remarks
   * **NOTE**: This plugin only works with the `chromium` browser, which comes bundled with the plugin.
   * You will not be able to use other engines or change the path to the browser executable.
   * If you need to use the default browsers without fingerprint spoofing, there is no point in using this method.
   *
   * @example
   * An example of launching the browser in visible mode:
   *
   * ```js
   * const browser = await plugin.spawn({
   *   headless: false,
   *   debuggingPort: 0,
   * });
   *
   * await browser.close();
   * ```
   *
   * @param options - Set of configurable options to set on the browser.
   * @returns Promise which resolves to a browser instance.
   */
  spawn(options?: Options): Promise<Browser>;

  /**
   * Change the request timeout that the plugin uses to work with the engine.
   * This method is an alternative to using the `FINGERPRINT_TIMEOUT` environment variable.
   *
   * You can read a bit more about these settings [here](https://github.com/CheshireCaat/browser-with-fingerprints#testing).
   *
   * @remarks
   * **NOTE**: This action changes the configuration for all instances of the plugin, that is, it works globally, just like environment variables.
   *
   * @example
   * ```js
   * plugin.setRequestTimeout(300000);
   * ```
   *
   * @param timeout - The selected request timeout.
   */
  setRequestTimeout(timeout: number): void;

  /**
   * Change the working folder that the plugin uses to work with the engine.
   * This method is an alternative to using the `FINGERPRINT_CWD` environment variable.
   *
   * You can read a bit more about these settings [here](https://github.com/CheshireCaat/browser-with-fingerprints#testing).
   *
   * @remarks
   * **NOTE**: This action changes the configuration for all instances of the plugin, that is, it works globally, just like environment variables.
   *
   * @example
   * ```js
   * plugin.setWorkingFolder('data');
   * ```
   *
   * @param folder - The selected working folder.
   */
  setWorkingFolder(folder: string): void;

  /**
   * Get or set the current browser version used by the plugin instance.
   *
   * Initially it is set to `default`, which means that the latest available version will be used.
   * The same behavior can be achieved by setting this property to an empty string or a zero identifier.
   * Also you can use the `random` value to select a random version, or use the version identifier instead of the version string.
   *
   * In order to get a list of available versions, use the `versions` method - the return values (version numbers and identifiers) can be used for this property.
   *
   * @remarks
   * **NOTE**: Please keep in mind that this property only affects a specific instance of the plugin, not the entire library.
   *
   * @example
   * ```js
   * // Use a specific version based on the full version string:
   * plugin.version = '115.0.5790.99';
   *
   * // Use a specific version based on the major version string:
   * plugin.version = '115';
   *
   * // Use a specific version based on the version identifier:
   * plugin.version = '1';
   *
   * // Use a random version from all available:
   * plugin.version = 'random';
   *
   * // Use the latest available version:
   * plugin.version = 'default';
   * ```
   */
  version: string;
}

/**
 * Describes an object that provides complete information about the available browser version.
 */
export interface Version {
  /**
   * Browser architecture. Possible values - `x64` or `x86`.
   */
  architecture: 'x64' | 'x86';
  /**
   * Full browser version, for example - `115.0.5790.99`.
   */
  browser_version: string;
  /**
   * Full engine version, for example - `25.9.1`.
   */
  bas_version: string;
  /**
   * Internal identifier of the browser build.
   */
  id: number;
}

/**
 * A default instance of the fingerprint plugin.
 */
export declare const plugin: FingerprintPlugin;
