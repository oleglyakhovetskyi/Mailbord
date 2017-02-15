using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Steadyworks.Repository.Base;

namespace Mailbord.Repository.Mail
{ 
    public class Mail: IEntity
    {
        public ObjectId Id { get; set; }
        public Mail()
        {
            Id = ObjectId.GenerateNewId(); 
        }

        [BsonElement("association")]
        public string Association { get; set; }

        [BsonElement("sender")]
        public string Sender { get; set; }

        [BsonElement("receiver")]
        public string Receiver { get; set; }

        [BsonElement("to")]
        public string To { get; set; }

        [BsonElement("stamp")]
        public Stamp Stamp { get; set; }    

        [BsonElement("subject")]
        public string Subject { get; set; }

        [BsonElement("text")]
        public string Message { get; set; }

        [BsonElement("html")]
        public string HtmlMessage { get; set; }

        [BsonElement("read")]
        public bool Read { get; set; }

        [BsonElement("trash")]
        public bool Trash { get; set; }

        [BsonElement("sent")]
        public bool Sent { get; set; }

        [BsonElement("spam")]
        public bool Spam { get; set; }

        [BsonElement("state")]
        public string State { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [BsonElement("spamScore")]
        public int SpamScope { get; set; }

        [BsonElement("dkim")]
        public bool Dkim { get; set; }

        [BsonElement("isSpam")]
        public bool IsSpame { get; set; }

        [BsonElement("spf")]
        public bool Spf { get; set; }

        [BsonElement("eID")]
        public string EId { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("attachments")]
       public BsonArray Attachments { get; set; }
    }

    public class Stamp
    {
        [BsonElement("sent")]
        public DateTime Send { get; set; }

        [BsonElement("received")]
        public DateTime Received { get; set; }
    }
}
