import { Button } from "@mui/material";
import { useState } from "react";

const Privacypolicy = () => {
    const [showTerms, setShowTerms] = useState(false);

    return (
        <>
            <Button style={{ marginTop: '50px' }} variant="outlined" onClick={() => setShowTerms(!showTerms)}>Terms Of Service</Button>
            {showTerms ? (
                <div>

                    <p>LifeSecure is committed to protecting your privacy and developing technology that gives you the most powerful and safe online experience. This Statement of Privacy applies to the LifeSecure site and governs data collection and usage. By using the LifeSecure site, you consent to the data practices described in this statement.
                        Personal Information

                        LifeSecure collects personally identifiable information, such as your email address, name, home or work address or telephone number. LifeSecure also collects anonymous demographic information, which is not unique to you, such as your ZIP code, age, gender, preferences, interests and favorites.

                        There is also information about your computer hardware and software that is automatically collected by LifeSecure. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used by LifeSecure for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the LifeSecure site.

                        Please keep in mind that if you directly disclose personally identifiable information or personally sensitive data through LifeSecure public message boards, this information may be collected and used by others. Note: LifeSecure does not read any of your private online communications.
                        Use of your Personal Information

                        LifeSecure collects and uses your personal information to operate the LifeSecure Web site and deliver the services you have requested. LifeSecure also uses your personally identifiable information to inform you of other products or services available from LifeSecure and its affiliates. LifeSecure may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered.

                        LifeSecure does not sell, rent or lease its customer lists to third parties. LifeSecure may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is not transferred to the third party. In addition, LifeSecure may share data with trusted partners to help us perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to LifeSecure, and they are required to maintain the confidentiality of your information.

                        LifeSecure does not use or disclose sensitive personal information, such as race, religion, or political affiliations, without your explicit consent.

                        LifeSecure Web sites will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on LifeSecure or the site; (b) protect and defend the rights or property of LifeSecure; and, (c) act under exigent circumstances to protect the personal safety of users of LifeSecure, or the public.
                        Use of Cookies

                        The LifeSecure Web site use "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a Web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.

                        One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize LifeSecure pages, or register with LifeSecure site or services, a cookie helps LifeSecure to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same LifeSecure Web site, the information you previously provided can be retrieved, so you can easily use the PDF Complete features that you customized.

                        You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the LifeSecure services or Web sites you visit.
                        Security of your Personal Information

                        LifeSecure secures your personal information from unauthorized access, use or disclosure. LifeSecure secures the personally identifiable information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use or disclosure. When personal information (such as a credit card number) is transmitted to other Web sites, it is protected through the use of encryption, such as the Secure Socket Layer (SSL) protocol.
                        Changes to this Statement

                        PDF Complete will occasionally update this Statement of Privacy to reflect company and customer feedback. LifeSecure encourages you to periodically review this Statement to be informed of how LifeSecure is protecting your information.
                        Contact Information

                        LifeSecure welcomes your comments regarding this Statement of Privacy. If you believe that PDF Complete has not adhered to this Statement, please contact PDF Complete at noemailyet@LifeSecure.com.
                    </p>
                </div>
            ) : <></>
            }
        </>
    )
}
export default Privacypolicy;