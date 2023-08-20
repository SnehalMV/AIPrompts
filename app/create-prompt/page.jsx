'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"

const CreatePage = () => {
  return (
      <Form/>
    )
}

export default CreatePage