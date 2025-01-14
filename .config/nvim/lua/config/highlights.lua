local colors = require("dracula.palette")
local satisfiyingBlue = "#4287f5"

local borderBG = colors.bg
local borderFG = colors.bright_blue

-- Color Panel
vim.api.nvim_set_hl(0, "WinSeparator", { fg = colors.purple, bold = true })

-- Color the Float Windows
vim.api.nvim_set_hl(0, "NormalFloat", { bg = colors.bg, fg = colors.fg })

vim.api.nvim_set_hl(0, "MiniHipatternsFixme", { bg = colors.bright_red, fg = colors.bg, bold = true }) -- FIXME
vim.api.nvim_set_hl(0, "MiniHipatternsHack", { bg = colors.orange, fg = colors.bg, bold = true }) -- HACK
vim.api.nvim_set_hl(0, "MiniHipatternsTodo", { bg = colors.pink, fg = colors.bg, bold = true }) -- TODO
vim.api.nvim_set_hl(0, "MiniHipatternsNote", { bg = colors.bright_blue, fg = colors.bg, bold = true }) -- NOTE

-- Git Signs
vim.api.nvim_set_hl(0, "GitSignsAdd", { bg = colors.bg, fg = colors.green })
vim.api.nvim_set_hl(0, "GitSignsDelete", { bg = colors.bg, fg = colors.red })
vim.api.nvim_set_hl(0, "GitSignsChange", { bg = colors.bg, fg = satisfiyingBlue })
vim.api.nvim_set_hl(0, "GitSignsAddPreview", { bg = colors.bg, fg = colors.green })
vim.api.nvim_set_hl(0, "GitSignsDeletePreview", { bg = colors.selection, fg = colors.red })
vim.api.nvim_set_hl(0, "GitSignsCurrentLineBlame", { fg = colors.white })

-- Snacks
vim.api.nvim_set_hl(0, "SnacksIndentChunk", { fg = "#53576D" })
vim.api.nvim_set_hl(0, "SnacksIndentScope", { fg = "#53576D" })
vim.api.nvim_set_hl(0, "SnacksZenIcon", { fg = "#FF79C6" })

-- Flash
vim.api.nvim_set_hl(0, "FlashMatch", { fg = colors.black, bg = colors.purple, bold = true })
vim.api.nvim_set_hl(0, "FlashCurrent", { fg = colors.black, bg = colors.orange, bold = true })
vim.api.nvim_set_hl(0, "FlashLabel", { fg = colors.black, bg = colors.pink, bold = true })
vim.api.nvim_set_hl(0, "FlashBackdrop", {}) -- We currently do not set any

-- Blink
vim.api.nvim_set_hl(0, "BlinkCmpMenuSelection", { bg = colors.selection, fg = colors.bright_blue })
vim.api.nvim_set_hl(0, "BlinkCmpMenuBorder", { bg = borderBG, fg = borderFG }) -- this needs to have the same background otherwise the menu looks strange

vim.api.nvim_set_hl(0, "BlinkCmpDocBorder", { bg = borderBG, fg = borderFG }) -- this needs to have the same background otherwise the menu looks strange
vim.api.nvim_set_hl(0, "BlinkCmpDocSeparator", { bg = colors.bg, fg = colors.bright_blue }) -- this needs to have the same background otherwise the menu looks strange

vim.api.nvim_set_hl(0, "BlinkCmpSignatureHelpBorder", { bg = borderBG, fg = borderFG })
-- vim.api.nvim_set_hl(0, "BlinkCmpSignatureHelpActiveParameter", { bg = colors.bg, fg = colors.bright_blue }) -- If you want to change the color here at some point
vim.api.nvim_set_hl(0, "BlinkCmpMenu", { bg = colors.bg })
vim.api.nvim_set_hl(0, "BlinkCmpScrollBarThumb", { bg = colors.bright_blue })

-- MINI --

-- Mini statusline
vim.api.nvim_set_hl(0, "MiniStatuslineModeNormal", { fg = colors.black, bg = colors.bright_white })
vim.api.nvim_set_hl(0, "MiniStatuslineModeInsert", { fg = colors.black, bg = colors.purple })
vim.api.nvim_set_hl(0, "MiniStatuslineModeVisual", { fg = colors.black, bg = colors.green })
vim.api.nvim_set_hl(0, "MiniStatuslineFilename", { fg = colors.bright_white, bg = colors.visual, bold = false })
vim.api.nvim_set_hl(0, "MiniStatuslineModifiedIndicator", { fg = colors.visual, bg = colors.pink })
vim.api.nvim_set_hl(0, "MiniStatuslineFileinfo", { fg = colors.white, bg = colors.black })
vim.api.nvim_set_hl(0, "MiniStatuslineDevinfo", { fg = colors.white, bg = colors.black })
vim.api.nvim_set_hl(0, "MiniStatuslineDiagnostics", { fg = colors.black, bg = colors.orange })
vim.api.nvim_set_hl(0, "MiniStatuslineMacro", { fg = colors.black, bg = colors.pink, bold = true })

vim.api.nvim_set_hl(0, "MiniStatuslineInactive", { fg = colors.bright_white, bg = colors.visual })

-- Mini files
vim.api.nvim_set_hl(0, "MiniFilesBorder", { fg = borderFG, bg = borderBG })
vim.api.nvim_set_hl(0, "MiniFilesBorderModified", { fg = colors.orange, bg = borderBG })
vim.api.nvim_set_hl(0, "MiniFilesCursorLine", { bg = colors.selection })
vim.api.nvim_set_hl(0, "MiniFilesDirectory", { fg = colors.purple })
vim.api.nvim_set_hl(0, "MiniFilesFile", { fg = colors.bright_white })
vim.api.nvim_set_hl(0, "MiniFilesNormal", {})
vim.api.nvim_set_hl(0, "MiniFilesTitle", { fg = colors.bright_white })
vim.api.nvim_set_hl(0, "MiniFilesTitleFocused", { fg = colors.bright_red, bold = true })
