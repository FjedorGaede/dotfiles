return {
  "echasnovski/mini.files",
  config = function()
    -- Do I really need this? or is it only for the status bar?
    local mini_files = require("mini.files")
    mini_files.setup({
      mappings = {
        go_in_plus = "<CR>",
      },
    })

    vim.keymap.set("n", "<leader>e", function()
      if not MiniFiles.close() then
        MiniFiles.open(vim.api.nvim_buf_get_name(0))
        MiniFiles.reveal_cwd()
      end
    end)
  end,
  init = function()
    -- TAKEN FROM HELP

    -- Yank in register full path of entry under cursor
    local yank_path = function()
      local path = (MiniFiles.get_fs_entry() or {}).path
      if path == nil then
        return vim.notify("Cursor is not on valid entry")
      end
      vim.fn.setreg(vim.v.register, path)
      print("Yanked full path")
    end

    vim.api.nvim_create_autocmd("User", {
      pattern = "MiniFilesBufferCreate",
      callback = function(args)
        local b = args.data.buf_id
        vim.keymap.set("n", "Y", yank_path, { buffer = b, desc = "Yank path" })
      end,
    })

    -- Add rounded border.
    vim.api.nvim_create_autocmd("User", {
      pattern = "MiniFilesWindowOpen",
      callback = function(args)
        local win_id = args.data.win_id
        vim.api.nvim_win_set_config(win_id, { border = "rounded" })
      end,
    })
  end,
}
