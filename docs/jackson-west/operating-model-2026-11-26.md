# Jackson-West: Who decides, who relays, and who acts

**Sidney Jackson III · Architecture note · November 26, 2026**

I designed Geoffrey Runtime so an assistant can help run the work without having authority over the company or a customer’s devices.

As CEO, I can text my assistant directly to review work, discuss proposals, and make decisions. That’s separate from the Geoffrey Assistant phone, a company-operated communications gateway. For workflows that use it, the phone carries customer messages to the corporate system and relays replies. It doesn’t approve requests or perform the customer’s actions.

Jackson-West checks who made a supported remote request and what they’re allowed to do. If the request is permitted, the server routes it to a registered customer device. That device acts under the customer’s own permissions. My own customer setup is meant to use that same path.

For example, if a customer asks to play a station, Jackson-West checks whether the request is allowed and passes it to the customer’s registered device. The device tries to play the station using its local setup. A confirmation tells us what the software reported, not whether someone actually heard the music. Running a Shortcut manually is a separate path.

The principle: the assistant can propose, the gateway can relay, and the server can authorize within policy. None of that replaces the customer’s permission.

This note records the design as of November 26. It doesn’t claim that every workflow uses the gateway or that every path has been verified end to end.
