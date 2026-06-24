import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

const EFFECTIVE_DATE = "June 16, 2026";
const LAST_REVISED = "June 16, 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ensure Home Loans" },
      { name: "description", content: "Ensure Home Loans privacy policy and consumer financial privacy notice." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-relaxed [&_p]:mb-4 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1 [&_a]:text-primary [&_a]:underline [&_table]:my-6">
      <h1>Privacy Policy and Consumer Financial Privacy Notice</h1>
      <p className="text-sm text-muted-foreground">
        Effective Date: {EFFECTIVE_DATE} | Last Revised: {LAST_REVISED}
      </p>

      <p>
        {siteConfig.brand}, LLC ("Ensure," "Company," "we," "our," or "us") respects the privacy and security of consumer financial information. This Privacy Policy explains how we collect, use, disclose, protect, and retain information in connection with mortgage loan brokerage services, mortgage loan applications, pre-qualification requests, rate inquiries, website use, and communications with consumers.
      </p>
      <p>
        This Privacy Policy is intended to apply to consumers, applicants, co-applicants, borrowers, prospective borrowers, former customers, and individuals who provide personal or financial information to Ensure Home Loans in connection with residential mortgage loan services.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        {siteConfig.brand}, LLC is a mortgage company and mortgage broker. We assist consumers with mortgage loan options and may submit loan applications or related information to wholesale lenders, investors, service providers, and settlement service providers for purposes of evaluating, processing, underwriting, closing, or servicing residential mortgage loans.
      </p>
      <p><strong>Company Information:</strong></p>
      <ul>
        <li>{siteConfig.brand}, LLC</li>
        <li>{siteConfig.nmlsId}</li>
        <li>2785 Rockbrook Drive, Suite 304, Lewisville, Texas 75067</li>
        <li>Phone: {siteConfig.phone}</li>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
      </ul>
      <p>
        Consumers may verify licensing information through{" "}
        <a
          href={`https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${siteConfig.nmlsId.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          NMLS Consumer Access
        </a>.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect nonpublic personal information and other consumer information from the following sources:</p>

      <h3>A. Information You Provide to Us</h3>
      <p>We may collect information you provide directly, including:</p>
      <ul>
        <li>Name, address, telephone number, email address, and other contact information;</li>
        <li>Date of birth, Social Security number, taxpayer identification number, and government identification information;</li>
        <li>Marital status, household information, and co-borrower information;</li>
        <li>Employment information, employer contact information, income, bonuses, commissions, self-employment income, rental income, and other income information;</li>
        <li>Asset information, bank statements, investment account information, retirement account information, gift-fund documentation, and reserve documentation;</li>
        <li>Debt information, liabilities, payment history, and monthly obligations;</li>
        <li>Property address, purchase contract information, occupancy information, insurance information, tax information, HOA information, and title or escrow information;</li>
        <li>Mortgage loan application information, pre-qualification information, loan program preferences, loan purpose, loan amount, down payment, and closing-cost information;</li>
        <li>Documents uploaded or submitted by you, including pay stubs, W-2s, tax returns, bank statements, identification documents, explanations, letters, authorizations, and other application materials;</li>
        <li>Communications with us, including email, text messages, telephone calls, website forms, online portal activity, and other written or electronic communications.</li>
      </ul>

      <h3>B. Information From Third Parties</h3>
      <p>We may collect information from third parties when reasonably necessary to provide mortgage brokerage services, including:</p>
      <ul>
        <li>Consumer reporting agencies and credit bureaus;</li>
        <li>Wholesale lenders, investors, and loan underwriting systems;</li>
        <li>Employers, payroll providers, tax transcript providers, and income verification vendors;</li>
        <li>Banks, financial institutions, and asset-verification providers;</li>
        <li>Real estate agents, builders, title companies, escrow companies, settlement agents, insurance agents, appraisers, credit vendors, flood vendors, and other settlement service providers;</li>
        <li>Public records, government records, licensing systems, court records, property records, and fraud-prevention databases;</li>
        <li>Technology vendors, loan origination systems, document providers, e-signature providers, compliance vendors, and communication platforms.</li>
      </ul>

      <h3>C. Website and Online Information</h3>
      <p>When you visit our website or use our online tools, we may collect:</p>
      <ul>
        <li>IP address, browser type, device type, operating system, referring pages, pages viewed, date/time stamps, and website activity;</li>
        <li>Online form submissions, calculator inputs, pre-qualification requests, callback requests, and chat or contact form information;</li>
        <li>Cookie and analytics information used to maintain website functionality, improve website performance, and understand how consumers interact with our site.</li>
      </ul>
      <p>We do not use website analytics to make a final credit decision.</p>

      <h2>3. How We Use Information</h2>
      <p>We use consumer information for legitimate business and legal purposes, including:</p>
      <ul>
        <li>To respond to inquiries, pre-qualification requests, and mortgage loan requests;</li>
        <li>To evaluate loan options and assist with mortgage loan brokerage services;</li>
        <li>To submit applications or loan-related information to lenders, investors, or underwriting systems;</li>
        <li>To verify identity, income, employment, assets, credit, debts, occupancy, property information, and eligibility;</li>
        <li>To order or coordinate credit reports, appraisals, title work, escrow services, flood determinations, insurance, fraud checks, compliance services, and other services related to a mortgage transaction;</li>
        <li>To prepare, deliver, and maintain disclosures, notices, authorizations, and records;</li>
        <li>To communicate with applicants, borrowers, co-borrowers, authorized representatives, lenders, real estate professionals, settlement providers, and regulators;</li>
        <li>To comply with federal and state mortgage laws, licensing requirements, examination requests, recordkeeping obligations, subpoenas, court orders, regulatory directives, and law-enforcement requests;</li>
        <li>To detect, prevent, and respond to fraud, identity theft, unauthorized access, data-security incidents, and other unlawful activity;</li>
        <li>To maintain, audit, improve, and secure our systems, records, website, loan origination process, and customer service operations;</li>
        <li>To send servicing, transactional, operational, or compliance-related communications;</li>
        <li>To send marketing communications where permitted by law and subject to applicable opt-out rights.</li>
      </ul>

      <h2>4. Categories of Information We May Disclose</h2>
      <p>We may disclose the following categories of nonpublic personal information when permitted or required by law:</p>
      <ul>
        <li>Identifiers and contact information;</li>
        <li>Social Security number, date of birth, and identity-verification information;</li>
        <li>Credit information, credit scores, credit reports, debts, liabilities, and payment history;</li>
        <li>Income, employment, assets, bank information, tax information, and financial statements;</li>
        <li>Loan application information, loan program information, loan amount, rate, fees, disclosures, and underwriting information;</li>
        <li>Property, title, insurance, appraisal, escrow, and closing information;</li>
        <li>Communications, authorizations, uploaded documents, and file notes;</li>
        <li>Website or technology information related to your use of our online services.</li>
      </ul>

      <h2>5. Parties With Whom We May Share Information</h2>
      <p>We may share information with the following categories of parties as necessary to conduct mortgage brokerage business, process or evaluate a loan request, comply with law, or protect our systems and consumers:</p>
      <ul>
        <li>Wholesale lenders, investors, aggregators, and loan underwriting systems;</li>
        <li>Consumer reporting agencies and credit bureaus;</li>
        <li>Appraisal management companies, appraisers, title companies, escrow companies, settlement agents, insurance agents, flood vendors, tax-service providers, verification vendors, document providers, and other settlement service providers;</li>
        <li>Loan origination systems, document-management vendors, e-signature vendors, cloud-storage providers, communication platforms, IT-support providers, cybersecurity providers, compliance vendors, audit vendors, and other business service providers;</li>
        <li>Real estate agents, builders, referral sources, or authorized representatives when directed or authorized by the consumer or when reasonably necessary for the transaction;</li>
        <li>Government agencies, regulators, examiners, law enforcement, courts, attorneys, auditors, licensing authorities, and other parties when required or permitted by law;</li>
        <li>Successor entities in connection with a merger, sale, transfer, corporate restructuring, or assignment of business assets, subject to applicable law.</li>
      </ul>
      <p>We require service providers to use consumer information only for authorized purposes and to maintain appropriate safeguards for the information they receive.</p>

      <h2>6. Our Sharing Practices Under Federal Financial Privacy Law</h2>
      <p>
        Federal law gives consumers the right to limit some, but not all, sharing of nonpublic personal information. Federal law also requires us to tell you how we collect, share, and protect your personal information.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-2 text-left font-semibold">Reason We May Share Your Personal Information</th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Do We Share?</th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Can You Limit This Sharing?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-3 py-2"><strong>For our everyday business purposes, such as processing your transaction, maintaining your file, responding to court orders and legal investigations, reporting to credit bureaus, or complying with regulators</strong></td>
              <td className="border border-border px-3 py-2"><strong>Yes</strong></td>
              <td className="border border-border px-3 py-2"><strong>No</strong></td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-3 py-2"><strong>For our marketing purposes, to offer our products or services to you</strong></td>
              <td className="border border-border px-3 py-2"><strong>Yes</strong></td>
              <td className="border border-border px-3 py-2"><strong>You may opt out of marketing communications</strong></td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2"><strong>For joint marketing with other financial companies</strong></td>
              <td className="border border-border px-3 py-2"><strong>No, unless separately disclosed</strong></td>
              <td className="border border-border px-3 py-2"><strong>Not applicable unless separately disclosed</strong></td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-3 py-2"><strong>For our affiliates' everyday business purposes, information about your transactions and experiences</strong></td>
              <td className="border border-border px-3 py-2"><strong>No</strong></td>
              <td className="border border-border px-3 py-2"><strong>Not applicable</strong></td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2"><strong>For our affiliates' everyday business purposes, information about your creditworthiness</strong></td>
              <td className="border border-border px-3 py-2"><strong>No</strong></td>
              <td className="border border-border px-3 py-2"><strong>Not applicable</strong></td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-3 py-2"><strong>For our affiliates to market to you</strong></td>
              <td className="border border-border px-3 py-2"><strong>No</strong></td>
              <td className="border border-border px-3 py-2"><strong>Not applicable</strong></td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2"><strong>For nonaffiliates to market to you</strong></td>
              <td className="border border-border px-3 py-2"><strong>No</strong></td>
              <td className="border border-border px-3 py-2"><strong>Not applicable</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        If Ensure changes its sharing practices in a way that requires additional notice or opt-out rights, Ensure will provide revised notices as required by law before making the new type of sharing.
      </p>

      <h2>7. Affiliates and Nonaffiliates</h2>
      <p><strong>"Affiliates"</strong> are companies related by common ownership or control.</p>
      <p>
        <strong>"Nonaffiliates"</strong> are companies not related by common ownership or control. Nonaffiliates may include lenders, investors, credit bureaus, title companies, escrow companies, appraisers, insurance providers, technology vendors, compliance vendors, and other service providers involved in mortgage loan transactions.
      </p>
      <p>Ensure does not share nonpublic personal information with nonaffiliates so they can market their own products or services to you.</p>

      <h2>8. Former Customers</h2>
      <p>
        We treat information about former customers the same way we treat information about current customers. We do not disclose information about former customers except as permitted or required by law, as necessary for business, legal, regulatory, audit, licensing, recordkeeping, fraud-prevention, or transaction-related purposes.
      </p>

      <h2>9. Consumer Choices and Marketing Opt-Outs</h2>
      <p>You may opt out of marketing communications from {siteConfig.brand} by:</p>
      <ul>
        <li>Calling us at {siteConfig.phone};</li>
        <li>Emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with "Marketing Opt-Out" in the subject line;</li>
        <li>Following the unsubscribe instructions in an email marketing message, if provided;</li>
        <li>Replying STOP to applicable text messages, where available.</li>
      </ul>
      <p>
        Marketing opt-outs do not stop transactional, servicing, compliance, legal, or loan-related communications.
      </p>
      <p>
        Consent to receive marketing calls, texts, or emails is not a condition of obtaining mortgage services, unless otherwise expressly stated and permitted by law.
      </p>

      <h2>10. Credit Reports and Consumer Reporting Information</h2>
      <p>
        When authorized by you and permitted by law, we may obtain credit reports and other consumer-reporting information to evaluate mortgage loan options, pre-qualification, pre-approval, application eligibility, underwriting, or loan placement.
      </p>
      <p>
        You may have rights under the Fair Credit Reporting Act to request information about consumer reporting agencies, dispute inaccurate information, or obtain copies of consumer reports. If you believe information in your credit report is inaccurate, you should contact the applicable consumer reporting agency directly.
      </p>

      <h2>11. Security of Information</h2>
      <p>
        Ensure maintains administrative, technical, and physical safeguards designed to protect consumer information against unauthorized access, use, disclosure, alteration, or destruction. These safeguards may include:
      </p>
      <ul>
        <li>Access controls and role-based permissions;</li>
        <li>Password controls and, where available, multi-factor authentication;</li>
        <li>Secure document portals or approved transmission methods for sensitive documents;</li>
        <li>Encryption or secure transmission methods where appropriate;</li>
        <li>Employee training on confidentiality and data handling;</li>
        <li>Vendor due diligence and service-provider oversight;</li>
        <li>Cybersecurity monitoring, system controls, and incident-response procedures;</li>
        <li>Restrictions on storing physical consumer records at unauthorized or unlicensed locations;</li>
        <li>Secure disposal or destruction of records when no longer required to be retained;</li>
        <li>Periodic review and adjustment of safeguards based on changes in business operations, systems, threats, and regulatory expectations.</li>
      </ul>
      <p>
        No method of transmission or storage is completely secure. Consumers should avoid sending Social Security numbers, bank statements, tax returns, or other sensitive documents through unsecured email unless directed through an approved secure method.
      </p>

      <h2>12. Remote Work and Loan Originator Controls</h2>
      <p>
        When employees, mortgage loan originators, processors, or other authorized personnel work remotely, they must follow Company policies governing secure access, confidentiality, consumer-information safeguards, document handling, and communications. Customer information may only be accessed through approved systems and for authorized business purposes.
      </p>
      <p>
        Physical records containing customer information may not be stored or received at an unauthorized or unlicensed residence or location.
      </p>

      <h2>13. Cookies and Website Technologies</h2>
      <p>
        Our website may use cookies, pixels, analytics tools, or similar technologies to support website functionality, improve website performance, understand website traffic, and assist with communications.
      </p>
      <p>
        You may be able to limit cookies through your browser settings. Disabling cookies may affect certain website functions.
      </p>
      <p>We do not use cookies or website analytics as the sole basis for a mortgage credit decision.</p>

      <h2>14. Data Retention and Recordkeeping</h2>
      <p>
        We retain consumer information and mortgage-related records for the period required by applicable federal and state law, regulatory requirements, investor requirements, litigation holds, audit requirements, and legitimate business purposes.
      </p>
      <p>
        When records are no longer required, we use reasonable procedures to dispose of or destroy records containing consumer information in a secure manner.
      </p>

      <h2>15. Data Breach and Security Incident Notice</h2>
      <p>
        If consumer information is subject to unauthorized access, acquisition, or disclosure requiring notice under applicable law, Ensure will investigate the incident and provide notices to affected consumers, regulators, law enforcement, or other required parties as required by law.
      </p>

      <h2>16. Children's Privacy</h2>
      <p>
        Ensure's mortgage services are not directed to children under the age of 18. We do not knowingly collect personal information from children for marketing purposes.
      </p>

      <h2>17. Accuracy and Updates</h2>
      <p>
        Consumers should provide accurate and complete information when requesting mortgage services. If you believe information you provided to us is incorrect or needs to be updated, contact us using the information below.
      </p>
      <p>
        Certain mortgage records cannot be deleted or changed if we are required to retain them for legal, regulatory, audit, underwriting, investor, or recordkeeping purposes.
      </p>

      <h2>18. Changes to This Privacy Policy</h2>
      <p>
        Ensure may revise this Privacy Policy from time to time. When we make material changes, we will update the "Last Revised" date and provide notice where required by law.
      </p>
      <p>
        If we change our information-sharing practices in a way that requires a revised privacy notice, we will provide the revised notice before implementing the changed practice, where required by law.
      </p>

      <h2>19. Contact Us</h2>
      <p>For questions about this Privacy Policy, consumer financial privacy, marketing opt-outs, or information-security practices, contact:</p>
      <ul>
        <li>{siteConfig.brand}, LLC</li>
        <li>{siteConfig.nmlsId}</li>
        <li>2785 Rockbrook Drive, Suite 304, Lewisville, Texas 75067</li>
        <li>Phone: {siteConfig.phone}</li>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
      </ul>
      <p>
        Consumers may verify licensing information through{" "}
        <a
          href={`https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${siteConfig.nmlsId.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          NMLS Consumer Access
        </a>.
      </p>
    </article>
  ),
});
