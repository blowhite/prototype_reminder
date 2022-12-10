export const checkTableList = [{
    tbName: 'tb_schdule',
    done: false,
    cQuery: `create table tb_schdule (
      schd_id text primary key,
      schd_kind text not null,
      schd_title text,
      schd_content text,
      schd_from_time text,
      schd_to_time text,
      write_time text,
      update_time text
      );`
  }, {
    tbName: 'tb_items',
    done: false,
    cQuery: `create table tb_items (
      itemkind text primary key,
      item_title text,
      item_content text
    );`
  }];