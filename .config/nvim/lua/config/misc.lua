-- This is for Angular files to be correctly colorized (NOTE: Can be removed when NVIM 0.11 is installed)
vim.filetype.add({
  pattern = {
    [".*%.component%.html"] = "htmlangular", -- Sets the filetype to `htmlangular` if it matches the pattern
  },
})
