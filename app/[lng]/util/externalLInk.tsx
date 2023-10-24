
export function ExternalLink({
    href,
    target,
    children,
    ...props
  }: JSX.IntrinsicElements['a']) {
    return (
      <a href={href} target={target ?? '_blank'} rel="noopener" {...props}>
        {children}
      </a>
    );
  }

/*
_blank: Opens the linked document in a new window or tab.
_self: Opens the linked document in the same frame as it was clicked (default).
_parent: Opens the linked document in the parent frame.
_top: Opens the linked document in the full body of the window.
*/

/*
When using target="_blank", it's recommended to include rel="noopener noreferrer" for security reasons:
noopener: Prevents the new page from being able to access the window.opener property, thereby ensuring it has no control over the tab that opened it. This can protect against potential vulnerabilities, especially when linking to untrusted or external sites.
noreferrer: Specifies that no referrer information should be sent with the request when following the link. This also has the effect of setting noopener.
There are other possible values for the rel attribute, such as nofollow, author, license, etc., each having its own specific use case.
*/