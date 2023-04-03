import React, { useState } from "react"
import Auth from "@auth/Auth"
import UnAuth from "@unAuth/UnAuth"

function App() {
  const [isSignIn, setIsSignIn] = useState(false)
  return <main>{isSignIn ? <Auth /> : <UnAuth setSign={setIsSignIn} />}</main>
}

export default App
