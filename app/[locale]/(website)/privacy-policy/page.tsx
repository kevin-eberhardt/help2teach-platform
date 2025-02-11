import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  if (locale === "en") {
    return (
      <main className="p-4 container mx-auto">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <h2 className="text-2xl mt-4 mb-2">1. Data Protection at a Glance</h2>
        <h3 className="text-xl my-2">General Information</h3>
        <p>
          The following information provides a simple overview of what happens
          to your personal data when you visit this website. Personal data
          includes all data that can personally identify you. Detailed
          information on data protection can be found in our privacy policy
          listed below this text.
        </p>
        <h3 className="text-xl my-2">Data Collection on This Website</h3>
        <h4 className="text-lg my-1">
          Who is responsible for data collection on this website?
        </h4>
        <p>
          Data processing on this website is carried out by the website
          operator. You can find their contact details in the section
          “Information on the Responsible Party” in this privacy policy.
        </p>
        <h4 className="text-lg my-1">How do we collect your data?</h4>
        <p>
          Some of your data is collected when you provide it to us. This may
          include data that you enter into a contact form.
        </p>
        <p>
          Other data is collected automatically or with your consent when you
          visit the website through our IT systems. These are primarily
          technical data (e.g., internet browser, operating system, or time of
          page access). The collection of this data occurs automatically as soon
          as you enter this website.
        </p>
        <h4 className="text-lg my-1">What do we use your data for?</h4>
        <p>
          Some of the data is collected to ensure the website functions
          correctly. Other data may be used to analyze your user behavior. If
          contracts are concluded or initiated via the website, the transmitted
          data will also be processed for contract offers, orders, or other
          service requests.
        </p>
        <h4 className="text-lg my-1">
          What rights do you have regarding your data?
        </h4>
        <p>
          You have the right to obtain free information about the origin,
          recipient, and purpose of your stored personal data at any time. You
          also have the right to request the correction or deletion of this
          data. If you have given consent to data processing, you can revoke
          this consent at any time with future effect. Additionally, you have
          the right, under certain circumstances, to request the restriction of
          the processing of your personal data. Furthermore, you have the right
          to file a complaint with the relevant supervisory authority.
        </p>
        <p>
          For this and any other questions regarding data protection, you can
          contact us at any time.
        </p>
        <h3 className="text-xl my-2">Analytics and Third-Party Tools</h3>
        <p>
          When visiting this website, your browsing behavior may be analyzed
          statistically. This is primarily done using analytics programs.
        </p>
        <p>
          Detailed information on these analytics programs can be found in the
          following privacy policy.
        </p>
        <h2 className="text-2xl mt-4 mb-2">2. Hosting</h2>
        <p>We host the content of our website with the following provider:</p>
        <h3 className="text-xl my-2">External Hosting</h3>
        <p>
          This website is externally hosted. The personal data collected on this
          website is stored on the servers of the hosting provider(s). This may
          include, in particular, IP addresses, contact requests, metadata and
          communication data, contract data, contact details, names, website
          visits, and other data generated via a website.
        </p>
        <p>
          External hosting is carried out for the purpose of fulfilling
          contracts with our potential and existing customers (Art. 6(1)(b)
          GDPR) and in the interest of a secure, fast, and efficient provision
          of our online offering by a professional provider (Art. 6(1)(f) GDPR).
          If consent has been requested, processing takes place exclusively on
          the basis of Art. 6(1)(a) GDPR and § 25(1) TDDDG, insofar as the
          consent includes the storage of cookies or access to information in
          the user's device (e.g., device fingerprinting) within the meaning of
          the TDDDG. Consent can be revoked at any time.
        </p>
        <p>
          Our hosting provider(s) will process your data only to the extent
          necessary to fulfill their service obligations and follow our
          instructions regarding this data.
        </p>
        <p>We use the following hosting provider(s):</p>
        <p>
          Vercel Inc.
          <br />
          440 N Barranca Avenue #4133
          <br />
          Covina, CA 91723
          <br />
          United States
        </p>
        <h2 className="text-2xl mt-4 mb-2">
          3. General Information and Mandatory Information
        </h2>
        <h3 className="text-xl my-2">Data Protection</h3>
        <p>
          The operators of this website take the protection of your personal
          data very seriously. We treat your personal data confidentially and in
          accordance with the legal data protection regulations as well as this
          privacy policy.
        </p>
        <p>
          When you use this website, various personal data is collected.
          Personal data is data that can be used to personally identify you.
          This privacy policy explains which data we collect and how we use it.
          It also explains how and for what purposes this occurs.
        </p>
        <p>
          We point out that data transmission over the internet (e.g., when
          communicating via email) may have security vulnerabilities. Complete
          protection of data from access by third parties is not possible.
        </p>
        <h3 className="text-xl my-2">Note on the responsible party</h3>
        <p>The responsible party for data processing on this website is:</p>
        <p>Kevin Eberhardt</p>
        <p>
          Geißbergstr. 9, 72800 Eningen
          <br />
          E-Mail:{" "}
          <Link
            href="mailto:mail@help2teach.de"
            className="text-primary underline"
          >
            mail@help2teach.de
          </Link>
        </p>
        <p>
          The responsible party is the natural or legal person who alone or
          jointly with others determines the purposes and means of processing
          personal data (e.g., names, email addresses, etc.).
        </p>
        <h3 className="text-xl my-2">Storage Duration</h3>
        <p>
          Unless a more specific storage period has been specified within this
          privacy policy, your personal data will remain with us until the
          purpose for data processing ceases to apply. If you make a legitimate
          request for deletion or revoke your consent to data processing, your
          data will be deleted unless we have other legally permissible reasons
          for storing your personal data (e.g., retention periods under tax or
          commercial law); in the latter case, deletion will occur after these
          reasons no longer apply.
        </p>
        <h3 className="text-xl my-2">
          General Information on the Legal Bases for Data Processing on This
          Website
        </h3>
        <p>
          If you have given your consent to data processing, we process your
          personal data based on Article 6(1)(a) GDPR or Article 9(2)(a) GDPR if
          special categories of data under Article 9(1) GDPR are processed. If
          you have explicitly consented to the transfer of personal data to
          third countries, the data processing is also carried out based on
          Article 49(1)(a) GDPR. If you have consented to the storage of cookies
          or access to information on your device (e.g., via device
          fingerprinting), data processing is additionally based on Section
          25(1) TDDDG. Consent can be revoked at any time. If your data is
          required for the fulfillment of a contract or for pre-contractual
          measures, we process your data based on Article 6(1)(b) GDPR.
          Furthermore, we process your data if this is necessary to fulfill a
          legal obligation based on Article 6(1)(c) GDPR. Data processing may
          also be carried out based on our legitimate interest according to
          Article 6(1)(f) GDPR. The specific legal bases applicable in each
          individual case are outlined in the following sections of this privacy
          policy.
        </p>
        <h3 className="text-xl my-2">Recipients of Personal Data</h3>
        <p>
          As part of our business activities, we work with various external
          parties. In some cases, the transfer of personal data to these
          external parties is required. We only share personal data with
          external parties if it is necessary for contract fulfillment, if we
          are legally obligated to do so (e.g., providing data to tax
          authorities), if we have a legitimate interest in sharing data
          according to Article 6(1)(f) GDPR, or if another legal basis allows
          for data sharing. When using processors, we only share personal data
          of our customers based on a valid data processing agreement. In the
          case of joint processing, a joint processing agreement is concluded.
        </p>
        <h3 className="text-xl my-2">
          Revocation of Your Consent to Data Processing
        </h3>
        <p>
          Many data processing operations are only possible with your explicit
          consent. You can revoke consent at any time. The legality of data
          processing carried out before the revocation remains unaffected.
        </p>
        <h3 className="text-xl my-2">
          Right to Object to Data Collection in Special Cases and to Direct
          Marketing (Article 21 GDPR)
        </h3>
        <p>
          IF DATA PROCESSING IS BASED ON ARTICLE 6(1)(E) OR (F) GDPR, YOU HAVE
          THE RIGHT TO OBJECT AT ANY TIME, FOR REASONS ARISING FROM YOUR
          PARTICULAR SITUATION, TO THE PROCESSING OF YOUR PERSONAL DATA; THIS
          ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE
          LEGAL BASIS FOR PROCESSING CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU
          OBJECT, WE WILL NO LONGER PROCESS YOUR PERSONAL DATA UNLESS WE CAN
          DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR PROCESSING THAT OUTWEIGH
          YOUR INTERESTS, RIGHTS, AND FREEDOMS, OR PROCESSING SERVES THE
          ASSERTION, EXERCISE, OR DEFENSE OF LEGAL CLAIMS (OBJECTION UNDER
          ARTICLE 21(1) GDPR).
        </p>
        <p>
          IF YOUR PERSONAL DATA IS PROCESSED FOR DIRECT MARKETING PURPOSES, YOU
          HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF YOUR
          PERSONAL DATA FOR SUCH ADVERTISING PURPOSES; THIS ALSO APPLIES TO
          PROFILING IN CONNECTION WITH SUCH DIRECT MARKETING. IF YOU OBJECT,
          YOUR PERSONAL DATA WILL NO LONGER BE USED FOR DIRECT MARKETING
          PURPOSES (OBJECTION UNDER ARTICLE 21(2) GDPR).
        </p>
        <h3 className="text-xl my-2">
          Right to Lodge a Complaint with the Competent Supervisory Authority
        </h3>
        <p>
          In the event of GDPR violations, affected individuals have the right
          to lodge a complaint with a supervisory authority, particularly in the
          member state of their habitual residence, workplace, or the location
          of the alleged violation. This right to lodge a complaint exists
          without prejudice to other administrative or judicial remedies.
        </p>
        <h3 className="text-xl my-2">Right to Data Portability</h3>
        <p>
          You have the right to have data that we process automatically based on
          your consent or in fulfillment of a contract provided to you or a
          third party in a commonly used, machine-readable format. If you
          request the direct transfer of the data to another controller, this
          will only be done where technically feasible.
        </p>
        <h3 className="text-xl my-2">Access, Rectification, and Deletion</h3>
        <p>
          Within the scope of applicable legal provisions, you have the right at
          any time to obtain free information about your stored personal data,
          its origin and recipients, and the purpose of data processing. You
          also have the right to correct or delete this data. For this purpose,
          as well as for other questions regarding personal data, you can
          contact us at any time.
        </p>
        <h3 className="text-xl my-2">Right to Restriction of Processing</h3>
        <p>
          You have the right to request the restriction of the processing of
          your personal data. To do so, you can contact us at any time. The
          right to restriction of processing applies in the following cases:
        </p>
        <ul className="list-disc py-2 px-4">
          <li>
            If you dispute the accuracy of your personal data stored with us, we
            usually need time to verify this. During the verification period,
            you have the right to request the restriction of processing your
            personal data.
          </li>
          <li>
            If the processing of your personal data was/is unlawful, you may
            request restriction of data processing instead of deletion.
          </li>
          <li>
            If we no longer need your personal data, but you require it for the
            assertion, defense, or exercise of legal claims, you have the right
            to request restriction of processing instead of deletion.
          </li>
          <li>
            If you have objected under Article 21(1) GDPR, a balance must be
            struck between your and our interests. Until it is determined whose
            interests prevail, you have the right to request restriction of the
            processing of your personal data.
          </li>
        </ul>
        <p>
          If you have restricted the processing of your personal data, such data
          may only be processed – apart from storage – with your consent, for
          the establishment, exercise, or defense of legal claims, for the
          protection of the rights of another natural or legal person, or for
          reasons of important public interest of the European Union or a member
          state.
        </p>
        <h3 className="text-xl my-2">SSL or TLS Encryption</h3>
        <p>
          This site uses SSL or TLS encryption for security reasons and to
          protect the transmission of confidential content, such as orders or
          inquiries you send to us. An encrypted connection can be recognized by
          the fact that the address bar of the browser changes from “http://” to
          “https://” and by the lock symbol in your browser bar.
        </p>
        <p>
          If SSL or TLS encryption is activated, the data you transmit to us
          cannot be read by third parties.
        </p>
        <h3 className="text-xl my-2">Objection to Promotional Emails</h3>
        <p>
          The use of contact details published as part of the legal notice
          obligation for sending unsolicited advertising and informational
          materials is hereby objected to. The site operators expressly reserve
          the right to take legal action in the event of unsolicited promotional
          information, such as spam emails.
        </p>
        <h2 className="text-2xl mt-4 mb-2">
          4. Data Collection on This Website
        </h2>
        <h3 className="text-xl my-2">Cookies</h3>
        <p>
          Our websites use so-called "cookies." Cookies are small data packets
          that do not cause any harm to your device. They are either stored
          temporarily for the duration of a session (session cookies) or
          permanently (persistent cookies) on your device. Session cookies are
          automatically deleted at the end of your visit. Persistent cookies
          remain stored on your device until you delete them yourself or they
          are automatically deleted by your web browser.
        </p>
        <p>
          Cookies can originate from us (first-party cookies) or from
          third-party companies (so-called third-party cookies). Third-party
          cookies enable the integration of certain services from third-party
          providers within websites (e.g., cookies for processing payment
          services).
        </p>
        <p>
          Cookies serve different functions. Many cookies are technically
          necessary, as certain website functions would not work without them
          (e.g., shopping cart functionality or video display). Other cookies
          may be used to analyze user behavior or for advertising purposes.
        </p>
        <p>
          Cookies that are required for electronic communication, for providing
          specific functions you have requested (e.g., shopping cart
          functionality), or for optimizing the website (e.g., cookies for
          measuring web audience) are stored based on Art. 6(1)(f) GDPR, unless
          another legal basis is specified. The website operator has a
          legitimate interest in storing necessary cookies for the technically
          error-free and optimized provision of its services. If consent for
          storing cookies and similar recognition technologies has been
          requested, processing will be based solely on this consent (Art.
          6(1)(a) GDPR and § 25(1) TDDDG); consent can be revoked at any time.
        </p>
        <p>
          You can configure your browser to inform you about the setting of
          cookies, allow cookies only in individual cases, exclude the
          acceptance of cookies for specific cases or in general, and activate
          automatic deletion of cookies when closing the browser. If cookies are
          deactivated, the functionality of this website may be restricted.
        </p>
        <p>
          Which cookies and services are used on this website can be found in
          this privacy policy.
        </p>
        <h3 className="text-xl my-2">Server Log Files</h3>
        <p>
          The provider of these pages automatically collects and stores
          information in so-called server log files, which your browser
          automatically transmits to us. These include:
        </p>
        <ul className="list-disc py-2 px-4">
          <li>Browser type and version</li>
          <li>Operating system used</li> <li>Referrer URL</li>
          <li>Hostname of the accessing computer</li>
          <li>Time of the server request</li> <li>IP address</li>
        </ul>
        <p>This data is not merged with other data sources.</p>
        <p>
          The collection of this data is based on Art. 6(1)(f) GDPR. The website
          operator has a legitimate interest in the technically error-free
          presentation and optimization of the website—this requires the
          collection of server log files.
        </p>
        <h3 className="text-xl my-2">Google Tag Manager</h3>
        <p>
          This website uses Google Tag Manager, a service provided by Google LLC
          ("Google"). Google Tag Manager is used to manage website tags through
          an interface. The Google Tag Manager itself does not collect any
          personal data. It simply implements tags for other services (such as
          Google Analytics), which may collect personal data on their own.
        </p>
        <p>
          The use of Google Tag Manager does not generally alter the processing
          of your data, as the Tag Manager merely serves as a platform for
          managing the tags. However, it allows us to use certain tags and
          tracking tools on this website to analyze user behavior and improve
          the user experience.
        </p>
        <p>
          For more information about privacy and terms of use, please refer to
          Google's privacy policy:{" "}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-primary underline"
          >
            https://policies.google.com/privacy
          </Link>
          .
        </p>
        <h3 className="text-xl my-2">Google Analytics</h3>
        <p>
          Our website uses functions of the web analytics service Google
          Analytics. The provider of this service is Google Inc., 1600
          Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics
          uses "cookies." These are small text files that your web browser
          stores on your device and that enable an analysis of website usage.
          Information generated by cookies about your use of our website is
          transmitted to and stored on a Google server. The usual server
          location is the USA.
        </p>
        <h4 className="text-lg my-1">IP Anonymization</h4>
        <p>
          We use Google Analytics with the IP anonymization feature. This
          ensures that Google shortens your IP address within member states of
          the European Union or in other contracting states of the Agreement on
          the European Economic Area before transmitting it to the USA. In
          exceptional cases, Google may transfer the full IP address to a server
          in the USA and shorten it there. On our behalf, Google uses this
          information to evaluate your use of the website, compile reports on
          website activities, and provide additional services related to website
          and internet usage. The IP address transmitted by Google Analytics
          will not be merged with other Google data.
        </p>
        <h3 className="text-xl my-2">
          Demographic Features in Google Analytics
        </h3>
        <p>
          Our website uses the "demographic features" function of Google
          Analytics. This allows reports to be generated containing information
          about the age, gender, and interests of website visitors. This data
          comes from Google’s interest-based advertising as well as visitor data
          from third-party providers. The data cannot be attributed to any
          specific individual.
        </p>
        <p>
          You can deactivate this function at any time through the ad settings
          in your Google account or by generally prohibiting Google Analytics
          from collecting your data, as explained in the section
          <q>Objection to Data Collection.</q>
        </p>
      </main>
    );
  } else {
    return (
      <main className="p-4 container mx-auto">
        <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
        <h2 className="text-2xl mt-4 mb-2">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-xl my-2">Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen &Uuml;berblick
          dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie
          diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
          denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
          Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie
          unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
        </p>
        <h3 className="text-xl my-2">Datenerfassung auf dieser Website</h3>
        <h4 className="text-lg my-1">
          Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?
        </h4>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
          &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
          Datenschutzerkl&auml;rung entnehmen.
        </p>
        <h4 className="text-lg my-1">Wie erfassen wir Ihre Daten?</h4>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
          mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie
          in ein Kontaktformular eingeben.
        </p>
        <p>
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
          Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem
          technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder
          Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
          automatisch, sobald Sie diese Website betreten.
        </p>
        <h4 className="text-lg my-1">Wof&uuml;r nutzen wir Ihre Daten?</h4>
        <p>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
          der Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur
          Analyse Ihres Nutzerverhaltens verwendet werden. Sofern &uuml;ber die
          Website Vertr&auml;ge geschlossen oder angebahnt werden k&ouml;nnen,
          werden die &uuml;bermittelten Daten auch f&uuml;r Vertragsangebote,
          Bestellungen oder sonstige Auftragsanfragen verarbeitet.
        </p>
        <h4 className="text-lg my-1">
          Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
        </h4>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
          Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten
          personenbezogenen Daten zu erhalten. Sie haben au&szlig;erdem ein
          Recht, die Berichtigung oder L&ouml;schung dieser Daten zu verlangen.
          Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
          k&ouml;nnen Sie diese Einwilligung jederzeit f&uuml;r die Zukunft
          widerrufen. Au&szlig;erdem haben Sie das Recht, unter bestimmten
          Umst&auml;nden die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
          Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde zu.
        </p>
        <p>
          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie
          sich jederzeit an uns wenden.
        </p>
        <h3 className="text-xl my-2">
          Analyse-Tools und Tools von Dritt&shy;anbietern
        </h3>
        <p>
          Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch
          ausgewertet werden. Das geschieht vor allem mit sogenannten
          Analyseprogrammen.
        </p>
        <p>
          Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in
          der folgenden Datenschutzerkl&auml;rung.
        </p>
        <h2 className="text-2xl mt-4 mb-2">2. Hosting</h2>
        <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
        <h3 className="text-xl my-2">Externes Hosting</h3>
        <p>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die
          auf dieser Website erfasst werden, werden auf den Servern des Hosters
          / der Hoster gespeichert. Hierbei kann es sich v.&nbsp;a. um
          IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
          Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige
          Daten, die &uuml;ber eine Website generiert werden, handeln.
        </p>
        <p>
          Das externe Hosting erfolgt zum Zwecke der Vertragserf&uuml;llung
          gegen&uuml;ber unseren potenziellen und bestehenden Kunden (Art. 6
          Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
          effizienten Bereitstellung unseres Online-Angebots durch einen
          professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
          entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
          ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
          &sect; 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von
          Cookies oder den Zugriff auf Informationen im Endger&auml;t des
          Nutzers (z.&nbsp;B. Device-Fingerprinting) im Sinne des TDDDG umfasst.
          Die Einwilligung ist jederzeit widerrufbar.
        </p>
        <p>
          Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten,
          wie dies zur Erf&uuml;llung seiner Leistungspflichten erforderlich ist
          und unsere Weisungen in Bezug auf diese Daten befolgen.
        </p>
        <p>Wir setzen folgende(n) Hoster ein:</p>
        <p>
          Vercel Inc.
          <br />
          440 N Barranca Avenue #4133
          <br />
          Covina, CA 91723
          <br />
          United States
        </p>
        <h2 className="text-2xl mt-4 mb-2">
          3. Allgemeine Hinweise und Pflicht&shy;informationen
        </h2>
        <h3 className="text-xl my-2">Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
          Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
          vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
          sowie dieser Datenschutzerkl&auml;rung.
        </p>
        <p>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
          Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
          pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende
          Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und
          wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem
          Zweck das geschieht.
        </p>
        <p>
          Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
          (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
          aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff
          durch Dritte ist nicht m&ouml;glich.
        </p>
        <h3 className="text-xl my-2">Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
          Website ist:
        </p>
        <p>Kevin Eberhardt</p>
        <p>
          Geißbergstr. 9, 72800 Eningen
          <br />
          E-Mail:{" "}
          <Link
            href="mailto:mail@help2teach.de"
            className="text-primary underline"
          >
            mail@help2teach.de
          </Link>
        </p>
        <p>
          Verantwortliche Stelle ist die nat&uuml;rliche oder juristische
          Person, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und
          Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen,
          E-Mail-Adressen o. &Auml;.) entscheidet.
        </p>
        <h3 className="text-xl my-2">Speicherdauer</h3>
        <p>
          Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
          Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten
          bei uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt.
          Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine
          Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
          gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen
          Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten
          haben (z.&nbsp;B. steuer- oder handelsrechtliche
          Aufbewahrungsfristen); im letztgenannten Fall erfolgt die
          L&ouml;schung nach Fortfall dieser Gr&uuml;nde.
        </p>
        <h3 className="text-xl my-2">
          Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf
          dieser Website
        </h3>
        <p>
          Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten
          wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit.
          a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
          Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle
          einer ausdr&uuml;cklichen Einwilligung in die &Uuml;bertragung
          personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung
          au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern
          Sie in die Speicherung von Cookies oder in den Zugriff auf
          Informationen in Ihr Endger&auml;t (z.&nbsp;B. via
          Device-Fingerprinting) eingewilligt haben, erfolgt die
          Datenverarbeitung zus&auml;tzlich auf Grundlage von &sect; 25 Abs. 1
          TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
          Vertragserf&uuml;llung oder zur Durchf&uuml;hrung vorvertraglicher
          Ma&szlig;nahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage
          des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre
          Daten, sofern diese zur Erf&uuml;llung einer rechtlichen Verpflichtung
          erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
          Datenverarbeitung kann ferner auf Grundlage unseres berechtigten
          Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. &Uuml;ber die
          jeweils im Einzelfall einschl&auml;gigen Rechtsgrundlagen wird in den
          folgenden Abs&auml;tzen dieser Datenschutzerkl&auml;rung informiert.
        </p>
        <h3 className="text-xl my-2">Empfänger von personenbezogenen Daten</h3>
        <p>
          Im Rahmen unserer Gesch&auml;ftst&auml;tigkeit arbeiten wir mit
          verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine
          &Uuml;bermittlung von personenbezogenen Daten an diese externen
          Stellen erforderlich. Wir geben personenbezogene Daten nur dann an
          externe Stellen weiter, wenn dies im Rahmen einer
          Vertragserf&uuml;llung erforderlich ist, wenn wir gesetzlich hierzu
          verpflichtet sind (z.&nbsp;B. Weitergabe von Daten an
          Steuerbeh&ouml;rden), wenn wir ein berechtigtes Interesse nach Art. 6
          Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige
          Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von
          Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden
          nur auf Grundlage eines g&uuml;ltigen Vertrags &uuml;ber
          Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung
          wird ein Vertrag &uuml;ber gemeinsame Verarbeitung geschlossen.
        </p>
        <h3 className="text-xl my-2">
          Widerruf Ihrer Einwilligung zur Datenverarbeitung
        </h3>
        <p>
          Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
          ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine
          bereits erteilte Einwilligung jederzeit widerrufen. Die
          Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
          Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
        </p>
        <h3 className="text-xl my-2">
          Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen
          sowie gegen Direktwerbung (Art. 21 DSGVO)
        </h3>
        <p>
          WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER
          F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE
          SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG
          IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH
          F&Uuml;R EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE
          JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
          ENTNEHMEN SIE DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH
          EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT
          MEHR VERARBEITEN, ES SEI DENN, WIR K&Ouml;NNEN ZWINGENDE
          SCHUTZW&Uuml;RDIGE GR&Uuml;NDE F&Uuml;R DIE VERARBEITUNG NACHWEISEN,
          DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN &Uuml;BERWIEGEN ODER DIE
          VERARBEITUNG DIENT DER GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG
          VON RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
        </p>
        <p>
          WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
          BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
          VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
          DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING,
          SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
          WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT
          MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21
          ABS. 2 DSGVO).
        </p>
        <h3 className="text-xl my-2">
          Beschwerde&shy;recht bei der zust&auml;ndigen
          Aufsichts&shy;beh&ouml;rde
        </h3>
        <p>
          Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den
          Betroffenen ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde,
          insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts,
          ihres Arbeitsplatzes oder des Orts des mutma&szlig;lichen
          Versto&szlig;es zu. Das Beschwerderecht besteht unbeschadet
          anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
        </p>
        <h3 className="text-xl my-2">
          Recht auf Daten&shy;&uuml;bertrag&shy;barkeit
        </h3>
        <p>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
          oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an
          sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren
          Format aush&auml;ndigen zu lassen. Sofern Sie die direkte
          &Uuml;bertragung der Daten an einen anderen Verantwortlichen
          verlangen, erfolgt dies nur, soweit es technisch machbar ist.
        </p>
        <h3 className="text-xl my-2">
          Auskunft, Berichtigung und L&ouml;schung
        </h3>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
          das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den
          Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
          L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
          personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
        </p>
        <h3 className="text-xl my-2">
          Recht auf Einschr&auml;nkung der Verarbeitung
        </h3>
        <p>
          Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
          jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der
          Verarbeitung besteht in folgenden F&auml;llen:
        </p>
        <ul className="list-disc py-2 px-4">
          <li>
            Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
            personenbezogenen Daten bestreiten, ben&ouml;tigen wir in der Regel
            Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer der
            Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der
            Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn die Verarbeitung Ihrer personenbezogenen Daten
            unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt der
            L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung
            verlangen.
          </li>
          <li>
            Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie
            sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von
            Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der
            L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt
            haben, muss eine Abw&auml;gung zwischen Ihren und unseren Interessen
            vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
            &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der
            Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
        </ul>
        <p>
          Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
          eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer
          Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
          Geltendmachung, Aus&uuml;bung oder Verteidigung von
          Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
          nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines
          wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union
          oder eines Mitgliedstaats verarbeitet werden.
        </p>
        <h3 className="text-xl my-2">SSL- bzw. TLS-Verschl&uuml;sselung</h3>
        <p>
          Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
          &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen
          oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-
          bzw. TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung
          erkennen Sie daran, dass die Adresszeile des Browsers von
          &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem
          Schloss-Symbol in Ihrer Browserzeile.
        </p>
        <p>
          Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen
          die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten
          mitgelesen werden.
        </p>
        <h3 className="text-xl my-2">Widerspruch gegen Werbe-E-Mails</h3>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten
          Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich
          angeforderter Werbung und Informationsmaterialien wird hiermit
          widersprochen. Die Betreiber der Seiten behalten sich
          ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten
          Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
        </p>
        <h2 className="text-2xl mt-4 mb-2">
          4. Datenerfassung auf dieser Website
        </h2>
        <h3 className="text-xl my-2">Cookies</h3>
        <p>
          Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;.
          Cookies sind kleine Datenpakete und richten auf Ihrem Endger&auml;t
          keinen Schaden an. Sie werden entweder vor&uuml;bergehend f&uuml;r die
          Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente
          Cookies) auf Ihrem Endger&auml;t gespeichert. Session-Cookies werden
          nach Ende Ihres Besuchs automatisch gel&ouml;scht. Permanente Cookies
          bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese selbst
          l&ouml;schen oder eine automatische L&ouml;schung durch Ihren
          Webbrowser erfolgt.
        </p>
        <p>
          Cookies k&ouml;nnen von uns (First-Party-Cookies) oder von
          Drittunternehmen stammen (sog. Third-Party-Cookies).
          Third-Party-Cookies erm&ouml;glichen die Einbindung bestimmter
          Dienstleistungen von Drittunternehmen innerhalb von Webseiten
          (z.&nbsp;B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
        </p>
        <p>
          Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind
          technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht
          funktionieren w&uuml;rden (z.&nbsp;B. die Warenkorbfunktion oder die
          Anzeige von Videos). Andere Cookies k&ouml;nnen zur Auswertung des
          Nutzerverhaltens oder zu Werbezwecken verwendet werden.
        </p>
        <p>
          Cookies, die zur Durchf&uuml;hrung des elektronischen
          Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen
          erw&uuml;nschter Funktionen (z.&nbsp;B. f&uuml;r die
          Warenkorbfunktion) oder zur Optimierung der Website (z.&nbsp;B.
          Cookies zur Messung des Webpublikums) erforderlich sind (notwendige
          Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
          gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der
          Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von
          notwendigen Cookies zur technisch fehlerfreien und optimierten
          Bereitstellung seiner Dienste. Sofern eine Einwilligung zur
          Speicherung von Cookies und vergleichbaren
          Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung
          ausschlie&szlig;lich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO und &sect; 25 Abs. 1 TDDDG); die Einwilligung ist
          jederzeit widerrufbar.
        </p>
        <p>
          Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das
          Setzen von Cookies informiert werden und Cookies nur im Einzelfall
          erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder
          generell ausschlie&szlig;en sowie das automatische L&ouml;schen der
          Cookies beim Schlie&szlig;en des Browsers aktivieren. Bei der
          Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website
          eingeschr&auml;nkt sein.
        </p>
        <p>
          Welche Cookies und Dienste auf dieser Website eingesetzt werden,
          k&ouml;nnen Sie dieser Datenschutzerkl&auml;rung entnehmen.
        </p>
        <h3 className="text-xl my-2">Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen
          in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
          &uuml;bermittelt. Dies sind:
        </p>
        <ul className="list-disc py-2 px-4">
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li> <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li> <li>IP-Adresse</li>
        </ul>
        <p>
          Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird
          nicht vorgenommen.
        </p>
        <p>
          Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an
          der technisch fehlerfreien Darstellung und der Optimierung seiner
          Website &ndash; hierzu m&uuml;ssen die Server-Log-Files erfasst
          werden.
        </p>
        <h3 className="text-xl my-2">Google Tag Manager</h3>
        <p>
          Diese Website verwendet den Google Tag Manager, einen Dienst der
          Google LLC ("Google"). Der Google Tag Manager dient zur Verwaltung von
          Website-Tags über eine Oberfläche. Der Google Tag Manager selbst
          erfasst keine personenbezogenen Daten. Es werden lediglich Tags für
          andere Dienste (wie Google Analytics) implementiert, die ihrerseits
          möglicherweise personenbezogene Daten erheben.
        </p>
        <p>
          Durch den Einsatz des Google Tag Managers wird die Verarbeitung Ihrer
          Daten im Allgemeinen nicht verändert, da der Tag Manager lediglich als
          Plattform für das Management der Tags fungiert. Der Tag Manager
          ermöglicht es uns jedoch, bestimmte Tags und Tracking-Tools auf dieser
          Website zu verwenden, um das Nutzerverhalten zu analysieren und die
          Benutzererfahrung zu verbessern.
        </p>
        <p>
          Weitere Informationen zum Datenschutz und den Nutzungsbedingungen von
          Google finden Sie in der Datenschutzerklärung von Google:{" "}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-primary underline"
          >
            https://policies.google.com/privacy.
          </Link>
        </p>
        <h3 className="text-xl my-2">Google Analytics</h3>
        <p>
          Unsere Website verwendet Funktionen des Webanalysedienstes Google
          Analytics. Anbieter des Webanalysedienstes ist die Google Inc., 1600
          Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics
          verwendet “Cookies.” Das sind kleine Textdateien, die Ihr Webbrowser
          auf Ihrem Endgerät speichert und eine Analyse der Website-Benutzung
          ermöglichen. Mittels Cookie erzeugte Informationen über Ihre Benutzung
          unserer Website werden an einen Server von Google übermittelt und dort
          gespeichert. Server-Standort ist im Regelfall die USA. Das Setzen von
          Google-Analytics-Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
          f DSGVO. Als Betreiber dieser Website haben wir ein berechtigtes
          Interesse an der Analyse des Nutzerverhaltens, um unser Webangebot und
          ggf. auch Werbung zu optimieren.
        </p>
        <h4 className="text-lg my-1">IP-Anonymisierung</h4>
        <p>
          Wir setzen Google Analytics in Verbindung mit der Funktion
          IP-Anonymisierung ein. Sie gewährleistet, dass Google Ihre IP-Adresse
          innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen
          Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum
          vor der Übermittlung in die USA kürzt. Es kann Ausnahmefälle geben, in
          denen Google die volle IP-Adresse an einen Server in den USA überträgt
          und dort kürzt. In unserem Auftrag wird Google diese Informationen
          benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über
          Websiteaktivitäten zu erstellen und um weitere mit der Websitenutzung
          und der Internetnutzung verbundene Dienstleistungen gegenüber uns zu
          erbringen. Es findet keine Zusammenführung der von Google Analytics
          übermittelten IP-Adresse mit anderen Daten von Google statt.
        </p>
        <h3 className="text-xl my-2">
          Demografische Merkmale bei Google Analytics
        </h3>
        <p>
          Unsere Website verwendet die Funktion “demografische Merkmale” von
          Google Analytics. Mit ihr lassen sich Berichte erstellen, die Aussagen
          zu Alter, Geschlecht und Interessen der Seitenbesucher enthalten.
          Diese Daten stammen aus interessenbezogener Werbung von Google sowie
          aus Besucherdaten von Drittanbietern. Eine Zuordnung der Daten zu
          einer bestimmten Person ist nicht möglich. Sie können diese Funktion
          jederzeit deaktivieren. Dies ist über die Anzeigeneinstellungen in
          Ihrem Google-Konto möglich oder indem Sie die Erfassung Ihrer Daten
          durch Google Analytics, wie im Punkt “Widerspruch gegen die
          Datenerfassung” erläutert, generell untersagen.
        </p>
      </main>
    );
  }
}
