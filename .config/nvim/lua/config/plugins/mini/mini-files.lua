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
