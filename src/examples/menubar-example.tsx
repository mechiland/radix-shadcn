import { demoAction } from '@/examples/demo-actions'


import * as React from "react"

import {
  Example,
  ExampleWrapper,
} from "@/examples/example"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export default function MenubarExample() {
  return (
    <ExampleWrapper>
      <MenubarBasic />
      <MenubarWithSubmenu />
      <MenubarSides />
      <MenubarWithCheckboxes />
      <MenubarWithRadio />
      <MenubarWithIcons />
      <MenubarWithShortcuts />
      <MenubarFormat />
      <MenubarInsert />
      <MenubarDestructive />
      <MenubarInDialog />
      <MenubarWithInset />
    </ExampleWrapper>
  )
}

function MenubarBasic() {
  return (
    <Example title="Basic">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>Cut</MenubarItem>
            <MenubarItem onClick={demoAction}>Copy</MenubarItem>
            <MenubarItem onClick={demoAction}>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarSides() {
  return (
    <Example title="Sides" containerClassName="col-span-2">
      <div className="flex flex-wrap justify-center gap-2">
        {(
          [
            "inline-start",
            "left",
            "top",
            "bottom",
            "right",
            "inline-end",
          ] as const
        ).map((side) => (
          <Menubar key={side}>
            <MenubarMenu>
              <MenubarTrigger className="capitalize">
                {side.replace("-", " ")}
              </MenubarTrigger>
              <MenubarContent side={side}>
                <MenubarGroup>
                  <MenubarItem onClick={demoAction}>New Tab</MenubarItem>
                  <MenubarItem onClick={demoAction}>New Window</MenubarItem>
                  <MenubarItem onClick={demoAction}>New Incognito Window</MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ))}
      </div>
    </Example>
  )
}

function MenubarWithSubmenu() {
  return (
    <Example title="With Submenu">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={demoAction}>Email link</MenubarItem>
                <MenubarItem onClick={demoAction}>Messages</MenubarItem>
                <MenubarItem onClick={demoAction}>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={demoAction}>Find...</MenubarItem>
                <MenubarItem onClick={demoAction}>Find Next</MenubarItem>
                <MenubarItem onClick={demoAction}>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>Cut</MenubarItem>
            <MenubarItem onClick={demoAction}>Copy</MenubarItem>
            <MenubarItem onClick={demoAction}>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarWithCheckboxes() {
  return (
    <Example title="With Checkboxes">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent className="w-64">
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Strikethrough</MenubarCheckboxItem>
            <MenubarCheckboxItem>Code</MenubarCheckboxItem>
            <MenubarCheckboxItem>Superscript</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarWithRadio() {
  const [user, setUser] = React.useState("benoit")
  const [theme, setTheme] = React.useState("system")

  return (
    <Example title="With Radio">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={user} onValueChange={setUser}>
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} inset>Edit...</MenubarItem>
            <MenubarItem onClick={demoAction} inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Theme</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarWithIcons() {
  return (
    <Example title="With Icons">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
              />
              New File <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              />
              Open Folder
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="SaveIcon"
                tabler="IconDeviceFloppy"
                hugeicons="FloppyDiskIcon"
                phosphor="FloppyDiskIcon"
                remixicon="RiSaveLine"
              />
              Save <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>More</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem onClick={demoAction}>
                <IconPlaceholder
                  lucide="CircleDashedIcon"
                  tabler="IconCircleDashed"
                  hugeicons="DashedLineCircleIcon"
                  phosphor="CircleDashedIcon"
                  remixicon="RiLoaderLine"
                />
                Settings
              </MenubarItem>
              <MenubarItem onClick={demoAction}>
                <IconPlaceholder
                  lucide="CircleDashedIcon"
                  tabler="IconCircleDashed"
                  hugeicons="DashedLineCircleIcon"
                  phosphor="CircleDashedIcon"
                  remixicon="RiLoaderLine"
                />
                Help
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={demoAction} variant="destructive">
                <IconPlaceholder
                  lucide="CircleDashedIcon"
                  tabler="IconCircleDashed"
                  hugeicons="DashedLineCircleIcon"
                  phosphor="CircleDashedIcon"
                  remixicon="RiLoaderLine"
                />
                Delete
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarWithShortcuts() {
  return (
    <Example title="With Shortcuts">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarFormat() {
  return (
    <Example title="Format">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="BoldIcon"
                tabler="IconBold"
                hugeicons="TextBoldIcon"
                phosphor="TextBIcon"
                remixicon="RiBold"
              />
              Bold <MenubarShortcut>⌘B</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="ItalicIcon"
                tabler="IconItalic"
                hugeicons="TextItalicIcon"
                phosphor="TextItalicIcon"
                remixicon="RiItalic"
              />
              Italic <MenubarShortcut>⌘I</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="UnderlineIcon"
                tabler="IconUnderline"
                hugeicons="TextUnderlineIcon"
                phosphor="TextUnderlineIcon"
                remixicon="RiUnderline"
              />
              Underline <MenubarShortcut>⌘U</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Strikethrough</MenubarCheckboxItem>
            <MenubarCheckboxItem>Code</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Show Ruler</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Show Grid</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} inset>Zoom In</MenubarItem>
            <MenubarItem onClick={demoAction} inset>Zoom Out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarInsert() {
  return (
    <Example title="Insert">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Insert</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <IconPlaceholder
                  lucide="ImageIcon"
                  tabler="IconPhoto"
                  hugeicons="ImageIcon"
                  phosphor="ImageIcon"
                  remixicon="RiImageLine"
                />
                Media
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={demoAction}>Image</MenubarItem>
                <MenubarItem onClick={demoAction}>Video</MenubarItem>
                <MenubarItem onClick={demoAction}>Audio</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="LinkIcon"
                tabler="IconLink"
                hugeicons="LinkIcon"
                phosphor="LinkIcon"
                remixicon="RiLinksLine"
              />
              Link <MenubarShortcut>⌘K</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="TableIcon"
                tabler="IconTable"
                hugeicons="TableIcon"
                phosphor="TableIcon"
                remixicon="RiTableLine"
              />
              Table
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tools</MenubarTrigger>
          <MenubarContent className="w-44">
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
              Find & Replace <MenubarShortcut>⌘F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
              Spell Check
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarDestructive() {
  return (
    <Example title="Destructive">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="w-40">
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
              />
              New File <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              />
              Open Folder
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              Delete File <MenubarShortcut>⌘⌫</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              />
              Profile
            </MenubarItem>
            <MenubarItem onClick={demoAction}>
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              />
              Settings
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} variant="destructive">
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              />
              Sign out
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={demoAction} variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}

function MenubarInDialog() {
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Menubar Example</DialogTitle>
            <DialogDescription>
              Use the menubar below to see the menu options.
            </DialogDescription>
          </DialogHeader>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={demoAction}>
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                  Copy
                </MenubarItem>
                <MenubarItem onClick={demoAction}>
                  <IconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  />
                  Cut
                </MenubarItem>
                <MenubarItem onClick={demoAction}>
                  <IconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  />
                  Paste
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>More Options</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={demoAction}>Save Page...</MenubarItem>
                    <MenubarItem onClick={demoAction}>Create Shortcut...</MenubarItem>
                    <MenubarItem onClick={demoAction}>Name Window...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={demoAction}>Developer Tools</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem onClick={demoAction} variant="destructive">
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                  Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={demoAction}>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={demoAction}>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </DialogContent>
      </Dialog>
    </Example>
  )
}

function MenubarWithInset() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showUrls, setShowUrls] = React.useState(false)
  const [theme, setTheme] = React.useState("system")

  return (
    <Example title="With Inset">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent className="w-44">
            <MenubarGroup>
              <MenubarLabel>Actions</MenubarLabel>
              <MenubarItem onClick={demoAction}>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
                Copy
              </MenubarItem>
              <MenubarItem onClick={demoAction}>
                <IconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsLine"
                />
                Cut
              </MenubarItem>
              <MenubarItem onClick={demoAction} inset>Paste</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel inset>Appearance</MenubarLabel>
              <MenubarCheckboxItem
                inset
                checked={showBookmarks}
                onCheckedChange={setShowBookmarks}
              >
                Bookmarks
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                inset
                checked={showUrls}
                onCheckedChange={setShowUrls}
              >
                Full URLs
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel inset>Theme</MenubarLabel>
              <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                <MenubarRadioItem inset value="light">
                  Light
                </MenubarRadioItem>
                <MenubarRadioItem inset value="dark">
                  Dark
                </MenubarRadioItem>
                <MenubarRadioItem inset value="system">
                  System
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger inset>More Options</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem onClick={demoAction}>Save Page...</MenubarItem>
                  <MenubarItem onClick={demoAction}>Create Shortcut...</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Example>
  )
}
